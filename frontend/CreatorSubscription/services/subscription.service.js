const Subscription = require('../models/SubscriptionModel');
const Creator = require('../../../backend/models/Creator');
const { createNotification } = require('../../Moderation/services/notification.service');

const PRO_PRICE_MONTHLY = 499;

const toUserId = (authUserId) => String(authUserId || '');

const getCreatorByUserId = async (userId) => {
  const creator = await Creator.findOne({ userId: toUserId(userId) });
  if (!creator) {
    const error = new Error('Creator profile not found');
    error.statusCode = 404;
    throw error;
  }
  return creator;
};

const attachCreatorSubscriptionId = async (creatorId, subscriptionId) => {
  await Creator.updateOne({ _id: creatorId }, { $set: { subscriptionId } });
};

const upsertForCreator = async (creator, payload) => {
  const existing = await Subscription.findOne({ creatorId: creator._id });
  if (!existing) {
    const created = await Subscription.create({ creatorId: creator._id, ...payload });
    await attachCreatorSubscriptionId(creator._id, created._id);
    return created;
  }

  Object.assign(existing, payload);
  await existing.save();
  await attachCreatorSubscriptionId(creator._id, existing._id);
  return existing;
};

const getSubscription = async (userId) => {
  const creator = await getCreatorByUserId(userId);
  let subscription = await Subscription.findOne({ creatorId: creator._id });

  if (!subscription) {
    subscription = await upsertForCreator(creator, {
      plan: 'free',
      status: 'active',
      billingCycle: 'forever',
      platformFeePercent: 15,
      hasSeenOnboarding: false,
      isBackfilled: false,
    });
  }

  return subscription;
};

const activateFreePlan = async (userId) => {
  const creator = await getCreatorByUserId(userId);
  return upsertForCreator(creator, {
    plan: 'free',
    status: 'active',
    billingCycle: 'forever',
    platformFeePercent: 15,
    currentPeriodStart: null,
    currentPeriodEnd: null,
    hasSeenOnboarding: true,
  });
};

const activateProPlan = async (userId) => {
  const creator = await getCreatorByUserId(userId);
  const current = await Subscription.findOne({ creatorId: creator._id });

  if (current?.plan === 'pro' && current?.status === 'active') {
    const error = new Error('You are already on Pro plan');
    error.statusCode = 409;
    throw error;
  }

  const now = new Date();
  const end = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const updated = await upsertForCreator(creator, {
    plan: 'pro',
    status: 'active',
    billingCycle: 'monthly',
    platformFeePercent: 8,
    currentPeriodStart: now,
    currentPeriodEnd: end,
    proActivatedAt: now,
    hasSeenOnboarding: true,
  });

  try {
    await createNotification(
      creator.userId,
      'report_update',
      'Pro Plan Activated 🎉',
      `You are now on the Pro plan (₹${PRO_PRICE_MONTHLY}/month). Enjoy 8% platform fees and priority search results.`
    );
  } catch (_error) {
    // Non-blocking notification
  }

  return updated;
};

const cancelProPlan = async (userId) => {
  const creator = await getCreatorByUserId(userId);
  const subscription = await Subscription.findOne({ creatorId: creator._id });

  if (!subscription || subscription.plan !== 'pro') {
    const error = new Error('No active Pro subscription found');
    error.statusCode = 400;
    throw error;
  }

  subscription.status = 'cancelled';
  subscription.hasSeenOnboarding = true;
  await subscription.save();

  try {
    const dateLabel = subscription.currentPeriodEnd
      ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(subscription.currentPeriodEnd)
      : 'the end of current cycle';

    await createNotification(
      creator.userId,
      'report_update',
      'Pro Plan Cancellation Scheduled',
      `Your Pro plan will remain active until ${dateLabel}.`
    );
  } catch (_error) {
    // Non-blocking notification
  }

  return subscription;
};

const markOnboardingSeen = async (userId) => {
  const creator = await getCreatorByUserId(userId);
  let sub = await Subscription.findOne({ creatorId: creator._id });

  if (!sub) {
    sub = await upsertForCreator(creator, {
      plan: 'free',
      status: 'active',
      billingCycle: 'forever',
      platformFeePercent: 15,
      hasSeenOnboarding: true,
    });
    return sub;
  }

  sub.hasSeenOnboarding = true;
  await sub.save();
  await attachCreatorSubscriptionId(creator._id, sub._id);
  return sub;
};

module.exports = {
  getSubscription,
  activateFreePlan,
  activateProPlan,
  cancelProPlan,
  markOnboardingSeen,
};
