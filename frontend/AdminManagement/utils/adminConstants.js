/** @type {readonly string[]} */
const ROLES = ['super_admin', 'moderator', 'support', 'finance'];
/** @type {readonly string[]} */
const ASSIGNABLE_ROLES = ['moderator', 'support', 'finance'];

const ROLE_DESCRIPTIONS = {
  super_admin: 'Full system control and oversight.',
  moderator: 'Manage content and creator reviews.',
  support: 'Ticketing and user assistance.',
  finance: 'Payout management and invoicing.',
};

const ROLE_BADGE_STYLES = {
  super_admin: { bg: '#1a1a1a', text: '#ffffff', filled: true },
  moderator: { bg: 'transparent', text: '#1a1a1a', filled: false },
  support: { bg: 'transparent', text: '#1a1a1a', filled: false },
  finance: { bg: 'transparent', text: '#1a1a1a', filled: false },
};

const AVATAR_PALETTE = ['#4F6EF7', '#F4A34D', '#5DC98A', '#E05C8A', '#9B6FF5', '#4CB8C4'];

module.exports = {
  ROLES,
  ASSIGNABLE_ROLES,
  ROLE_DESCRIPTIONS,
  ROLE_BADGE_STYLES,
  AVATAR_PALETTE,
};
