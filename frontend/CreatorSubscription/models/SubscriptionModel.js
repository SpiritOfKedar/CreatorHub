const mongoose = require('../../Moderation/models/_mongoose');

const enterpriseDetailsSchema = new mongoose.Schema(
  {
    agencyName: { type: String, default: '' },
    gstin: { type: String, default: '' },
    address: { type: String, default: '' },
    email: { type: String, default: '' },
    managerName: { type: String, default: '' },
    phone: { type: String, default: '' },
    submittedAt: { type: Date, default: null },
    approvedAt: { type: Date, default: null },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null },
    notes: { type: String, default: '' },
  },
  { _id: false }
);

const subscriptionSchema = new mongoose.Schema(
  {
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator', required: true, unique: true, index: true },
    plan: { type: String, enum: ['free', 'pro', 'premium'], default: 'free' },
    status: { type: String, enum: ['active', 'pending', 'cancelled', 'expired'], default: 'active' },
    billingCycle: { type: String, enum: ['monthly', 'forever', 'custom'], default: 'forever' },
    currentPeriodStart: { type: Date, default: null },
    currentPeriodEnd: { type: Date, default: null },
    proActivatedAt: { type: Date, default: null },
    enterpriseDetails: { type: enterpriseDetailsSchema, default: () => ({}) },
    platformFeePercent: { type: Number, default: 15 },
    hasSeenOnboarding: { type: Boolean, default: false },
    isBackfilled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: process.env.CREATOR_SUBSCRIPTION_COLLECTION || 'creator_subscriptions',
  }
);

module.exports =
  mongoose.models.Subscription ||
  mongoose.model('Subscription', subscriptionSchema);
