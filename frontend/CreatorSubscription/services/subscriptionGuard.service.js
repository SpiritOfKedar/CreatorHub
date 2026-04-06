const Subscription = require('../models/SubscriptionModel');
const Creator = require('../../../backend/models/Creator');
const { createNotification } = require('../../Moderation/services/notification.service');

const getCreator = async (userId) => {
  const creator = await Creator.findOne({ userId: String(userId) });
  if (!creator) {
    const error = new Error('Creator profile not found');
    error.statusCode = 404;
    throw error;
  }
  return creator;
};

const createFreeIfMissing = async (creatorId, isBackfilled = false) => {
  const now = new Date();
  const subscription = await Subscription.create({
    creatorId,
    plan: 'free',
    status: 'active',
    billingCycle: 'forever',
    currentPeriodStart: null,
    currentPeriodEnd: null,
    platformFeePercent: 15,
    hasSeenOnboarding: false,
    isBackfilled,
    enterpriseDetails: {},
    proActivatedAt: null,
    createdAt: now,
    updatedAt: now,
  });

  await Creator.updateOne({ _id: creatorId }, { $set: { subscriptionId: subscription._id } });
  return subscription;
};

const checkAndInitSubscription = async (userId) => {
  const creator = await getCreator(userId);
  let subscription = await Subscription.findOne({ creatorId: creator._id });

  // CASE 1 — missing subscription
  if (!subscription) {
    subscription = await createFreeIfMissing(creator._id, false);
    return { plan: 'free', showOnboarding: true, isExistingCreator: false, subscription };
  }

  // CASE 2 — onboarding not seen yet
  if (subscription.hasSeenOnboarding === false) {
    return {
      plan: subscription.plan,
      showOnboarding: true,
      isExistingCreator: Boolean(subscription.isBackfilled),
      subscription,
    };
  }

  // CASE 3 — pro cancelled and expired => revert to free
  const now = Date.now();
  const isExpiredCancelledPro =
    subscription.plan === 'pro' &&
    subscription.status === 'cancelled' &&
    subscription.currentPeriodEnd &&
    new Date(subscription.currentPeriodEnd).getTime() < now;

  if (isExpiredCancelledPro) {
    subscription.plan = 'free';
    subscription.status = 'active';
    subscription.billingCycle = 'forever';
    subscription.platformFeePercent = 15;
    subscription.currentPeriodStart = null;
    subscription.currentPeriodEnd = null;
    await subscription.save();

    try {
      await createNotification(
        creator.userId,
        'report_update',
        'Pro Plan Expired',
        'Your Pro plan has expired. You are now on the Free plan.'
      );
    } catch (_error) {
      // Non-blocking notification
    }

    return { plan: 'free', showOnboarding: false, isExistingCreator: Boolean(subscription.isBackfilled), subscription };
  }

  // CASE 4 — all good
  return {
    plan: subscription.plan,
    showOnboarding: false,
    isExistingCreator: Boolean(subscription.isBackfilled),
    subscription,
  };
};

module.exports = {
  checkAndInitSubscription,
  createFreeIfMissing,
};
