"use client";

const { ROLE_BADGE_STYLES } = require('../utils/adminConstants');

/**
 * @param {{ role: 'super_admin'|'moderator'|'support'|'finance' }} props
 */
export default function RoleBadge({ role }) {
  const style = ROLE_BADGE_STYLES[role] || ROLE_BADGE_STYLES.moderator;
  const label = role.replace('_', ' ');

  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize"
      style={{
        background: style.bg,
        color: style.text,
        borderColor: style.filled ? style.bg : '#d1d5db',
      }}
    >
      {label}
    </span>
  );
}
