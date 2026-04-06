const { z } = require('zod');
const Subscription = require('../models/SubscriptionModel');
const Creator = require('../../../backend/models/Creator');
const User = require('../../../backend/models/User');
const Admin = require('../../AdminManagement/models/AdminModel');
const { createNotification } = require('../../Moderation/services/notification.service');
const { log } = require('../../Moderation/services/adminLog.service');

const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const enterpriseSchema = z.object({
  agencyName: z.string().trim().min(2).max(100),
  gstin: z.string().trim().regex(gstinRegex, 'Enter a valid 15-character GSTIN'),
  address: z.string().trim().min(10).max(300),
  email: z.string().trim().email(),
  managerName: z.string().trim().min(2).max(60),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
});

const getCreatorByUserId = async (userId) => {
  const creator = await Creator.findOne({ userId: String(userId) });
  if (!creator) {
    const error = new Error('Creator profile not found');
    error.statusCode = 404;
    throw error;
  }
  return creator;
};

const submitEnterpriseRequest = async (userId, formData) => {
  const creator = await getCreatorByUserId(userId);
  const payload = enterpriseSchema.parse(formData);

  const now = new Date();
  let subscription = await Subscription.findOne({ creatorId: creator._id });

  if (!subscription) {
    subscription = await Subscription.create({ creatorId: creator._id });
  }

  subscription.plan = 'premium';
  subscription.status = 'pending';
  subscription.billingCycle = 'custom';
  subscription.platformFeePercent = 5;
  subscription.currentPeriodStart = null;
  subscription.currentPeriodEnd = null;
  subscription.hasSeenOnboarding = true;
  subscription.enterpriseDetails = {
    agencyName: payload.agencyName,
    gstin: payload.gstin,
    address: payload.address,
    email: payload.email,
    managerName: payload.managerName,
    phone: payload.phone,
    submittedAt: now,
    approvedAt: null,
    approvedBy: null,
    notes: '',
  };

  await subscription.save();
  await Creator.updateOne({ _id: creator._id }, { $set: { subscriptionId: subscription._id } });

  try {
    const superAdmins = await Admin.find({ role: 'super_admin', status: 'active' }).select('email').lean();
    if (superAdmins.length > 0) {
      const users = await User.find({ email: { $in: superAdmins.map((a) => a.email) } }).select('_id').lean();
      await Promise.all(users.map((u) =>
        createNotification(
          u._id,
          'report_update',
          'New Enterprise Request',
          `${payload.agencyName} submitted a Premium plan request.`
        )
      ));
    }
  } catch (_error) {
    // Non-blocking notification
  }

  try {
    await createNotification(
      creator.userId,
      'report_update',
      'Enterprise Request Submitted',
      `We will contact you at ${payload.email} within 2 business days.`
    );
  } catch (_error) {
    // Non-blocking notification
  }

  return subscription;
};

const approveEnterpriseRequest = async (subscriptionId, adminUser, notes = '') => {
  const subscription = await Subscription.findById(subscriptionId).populate('creatorId');
  if (!subscription) {
    const error = new Error('Subscription not found');
    error.statusCode = 404;
    throw error;
  }

  if (subscription.plan !== 'premium' || subscription.status !== 'pending') {
    const error = new Error('No pending enterprise request found for this subscription');
    error.statusCode = 400;
    throw error;
  }

  const adminProfile = await Admin.findOne({ email: String(adminUser.email || '').toLowerCase() }).lean();

  subscription.status = 'active';
  subscription.billingCycle = 'custom';
  subscription.platformFeePercent = 5;
  subscription.enterpriseDetails = {
    ...(subscription.enterpriseDetails || {}),
    approvedAt: new Date(),
    approvedBy: adminProfile?._id || null,
    notes: String(notes || '').slice(0, 500),
  };

  await subscription.save();

  if (subscription.creatorId?._id) {
    await Creator.updateOne({ _id: subscription.creatorId._id }, { $set: { subscriptionId: subscription._id } });
  }

  try {
    const creator = subscription.creatorId || (subscription.creatorId ? await Creator.findById(subscription.creatorId) : null);
    const creatorUserId = creator?.userId;
    if (creatorUserId) {
      await createNotification(
        creatorUserId,
        'report_update',
        'Enterprise Plan Approved',
        'Your Premium plan request has been approved. Welcome to enterprise scale.'
      );
    }
  } catch (_error) {
    // Non-blocking notification
  }

  try {
    await log(
      adminUser._id,
      'admin_route_access',
      subscription._id,
      'subscription',
      'Enterprise request approved',
      { subscriptionId: subscription._id, notes: String(notes || '').slice(0, 500) }
    );
  } catch (_error) {
    // Non-blocking audit log
  }

  return subscription;
};

module.exports = {
  enterpriseSchema,
  submitEnterpriseRequest,
  approveEnterpriseRequest,
};
