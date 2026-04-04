const { AVATAR_PALETTE } = require('./adminConstants');

/**
 * Build initials from full name.
 * @param {string} name
 * @returns {string}
 */
function getInitials(name = '') {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'AD';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/**
 * Deterministic avatar color by username.
 * @param {string} username
 * @returns {string}
 */
function getAvatarColor(username = '') {
  const source = String(username).toLowerCase();
  const sum = [...source].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
}

/**
 * Format relative last active time.
 * @param {Date|string|number} dateInput
 * @returns {string}
 */
function formatLastActive(dateInput) {
  if (!dateInput) return '—';
  const date = new Date(dateInput);
  const diffMs = Date.now() - date.getTime();

  const mins = Math.floor(diffMs / (1000 * 60));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min${mins === 1 ? '' : 's'} ago`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

/**
 * Format added date.
 * @param {Date|string|number} dateInput
 * @returns {string}
 */
function formatAddedOn(dateInput) {
  if (!dateInput) return '—';
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

module.exports = {
  getInitials,
  getAvatarColor,
  formatLastActive,
  formatAddedOn,
};
