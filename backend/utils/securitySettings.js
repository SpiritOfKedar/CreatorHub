const { AppSetting } = require('../models/AdminData');

const DEFAULT_SESSION_TIMEOUT = '30 Minutes';
const DEFAULT_MIN_PASSWORD_LENGTH = 12;
const MIN_PASSWORD_LENGTH_FLOOR = 6;
const MIN_PASSWORD_LENGTH_CEILING = 64;

const SESSION_TIMEOUT_PRESETS = {
  '30 minutes': { label: '30 Minutes', ms: 30 * 60 * 1000, jwtExpiresIn: '30m' },
  '1 hour': { label: '1 Hour', ms: 60 * 60 * 1000, jwtExpiresIn: '1h' },
  '12 hours': { label: '12 Hours', ms: 12 * 60 * 60 * 1000, jwtExpiresIn: '12h' },
  '24 hours': { label: '24 Hours', ms: 24 * 60 * 60 * 1000, jwtExpiresIn: '24h' },
};

const normalizeSessionTimeout = (value) => {
  const normalized = String(value || '').trim().toLowerCase();

  if (SESSION_TIMEOUT_PRESETS[normalized]) {
    return SESSION_TIMEOUT_PRESETS[normalized].label;
  }

  return DEFAULT_SESSION_TIMEOUT;
};

const getSessionTimeoutConfig = (value) => {
  const normalized = normalizeSessionTimeout(value).toLowerCase();
  return SESSION_TIMEOUT_PRESETS[normalized] || SESSION_TIMEOUT_PRESETS[DEFAULT_SESSION_TIMEOUT.toLowerCase()];
};

const normalizeMinPasswordLength = (value) => {
  const parsed = Number.parseInt(String(value), 10);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_MIN_PASSWORD_LENGTH;
  }

  if (parsed < MIN_PASSWORD_LENGTH_FLOOR) {
    return MIN_PASSWORD_LENGTH_FLOOR;
  }

  if (parsed > MIN_PASSWORD_LENGTH_CEILING) {
    return MIN_PASSWORD_LENGTH_CEILING;
  }

  return parsed;
};

const getRuntimeSecuritySettings = async () => {
  try {
    const settings = await AppSetting.findOne()
      .select('sessionTimeout minPasswordLength')
      .lean();

    const sessionConfig = getSessionTimeoutConfig(settings?.sessionTimeout);

    return {
      sessionTimeout: sessionConfig.label,
      sessionTimeoutMs: sessionConfig.ms,
      jwtExpiresIn: sessionConfig.jwtExpiresIn,
      minPasswordLength: normalizeMinPasswordLength(settings?.minPasswordLength),
    };
  } catch {
    const fallback = getSessionTimeoutConfig(DEFAULT_SESSION_TIMEOUT);

    return {
      sessionTimeout: fallback.label,
      sessionTimeoutMs: fallback.ms,
      jwtExpiresIn: fallback.jwtExpiresIn,
      minPasswordLength: DEFAULT_MIN_PASSWORD_LENGTH,
    };
  }
};

module.exports = {
  DEFAULT_SESSION_TIMEOUT,
  DEFAULT_MIN_PASSWORD_LENGTH,
  normalizeSessionTimeout,
  normalizeMinPasswordLength,
  getSessionTimeoutConfig,
  getRuntimeSecuritySettings,
};
