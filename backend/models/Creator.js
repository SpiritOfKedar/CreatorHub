const mongoose = require('mongoose');

const creatorSchema = mongoose.Schema(
  {
    userId: { type: String, required: true, default: 'default_user_1' },
    name: { type: String, default: 'Alex Morgan' },
    username: { type: String, default: 'alexcreates' },
    avatar: { type: String, default: 'https://i.pravatar.cc/150' },
    banner: { type: String, default: '/assets/creator/banner.png' },
    bio: { type: String, default: 'Digital Artist and Photographer. Welcome to my exclusive content area.' },
    category: { type: String, default: 'Art and Design' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    socialLinks: {
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      tiktok: { type: String, default: '' },
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    earnings: {
      total: { type: Number, default: 0 },
      thisMonth: { type: Number, default: 0 },
    },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', default: null },
    subscriptionPrice: { type: Number, default: 4.99 },
    payoutSettings: {
      kyc: { 
        status: { type: String, enum: ['unverified', 'pending', 'verified'], default: 'unverified' },
        pan: { type: String, default: '' },
        aadhaar: { type: String, default: '' },
        updatedAt: { type: Date }
      },
      billing: {
        status: { type: String, enum: ['unverified', 'verified'], default: 'unverified' },
        address: { type: String, default: '' },
        taxId: { type: String, default: '' },
        updatedAt: { type: Date }
      },
      bank: {
        status: { type: String, enum: ['unverified', 'verified'], default: 'unverified' },
        accountNumber: { type: String, default: '' },
        ifsc: { type: String, default: '' },
        bankName: { type: String, default: '' },
        updatedAt: { type: Date }
      }
    }
  },
  { timestamps: true }
);

creatorSchema.virtual('subscription', {
  ref: 'Subscription',
  localField: 'subscriptionId',
  foreignField: '_id',
  justOne: true,
});

creatorSchema.set('toJSON', { virtuals: true });
creatorSchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.Creator || mongoose.model('Creator', creatorSchema);
