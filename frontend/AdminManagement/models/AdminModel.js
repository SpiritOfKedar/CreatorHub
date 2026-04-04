const mongoose = require('../../Moderation/models/_mongoose');
const { getInitials, getAvatarColor } = require('../utils/adminHelpers');
const { ROLES } = require('../utils/adminConstants');

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ROLES, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    avatarInitials: { type: String, default: '' },
    avatarColor: { type: String, default: '' },
    lastActiveAt: { type: Date, default: Date.now },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default: null },
  },
  { timestamps: true }
);

adminSchema.pre('save', function deriveAvatarFields(next) {
  if (!this.avatarInitials) this.avatarInitials = getInitials(this.name);
  if (!this.avatarColor) this.avatarColor = getAvatarColor(this.username);
  next();
});

adminSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret.password;
    return ret;
  },
});

module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
