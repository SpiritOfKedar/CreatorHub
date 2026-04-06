const { PLAN_ORDER } = require('./subscriptionConstants');

const getPlatformFee = (subscription) => {
  if (!subscription) return 15;
  return subscription.platformFeePercent ?? 15;
};

const isUpgrade = (currentPlan, targetPlan) => {
  return PLAN_ORDER.indexOf(targetPlan) > PLAN_ORDER.indexOf(currentPlan);
};

const getPlanBadgeLabel = (plan, status) => {
  if (plan === 'pro') return 'PRO';
  if (plan === 'premium' && status === 'active') return 'PREMIUM';
  if (plan === 'premium' && status === 'pending') return 'PENDING';
  return null;
};

const formatPeriodEnd = (date) => {
  if (!date) return '—';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
};

const calcNextBillingDate = (date) => {
  const d = new Date(date || Date.now());
  d.setMonth(d.getMonth() + 1);
  return formatPeriodEnd(d);
};

const formatDuration = (startTime) => {
  const elapsedMs = Date.now() - Number(startTime || Date.now());
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
};

module.exports = {
  getPlatformFee,
  isUpgrade,
  getPlanBadgeLabel,
  formatPeriodEnd,
  calcNextBillingDate,
  formatDuration,
};
