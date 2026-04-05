const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getRuntimeSecuritySettings } = require('../utils/securitySettings');

const SESSION_ACTIVITY_REFRESH_MS = 60 * 1000;

const protect = async (req, res, next) => {
  let token;

  const attachUserFromToken = async (rawToken) => {
    const decoded = jwt.verify(rawToken, process.env.JWT_SECRET || 'secret123');
    const { sessionTimeoutMs } = await getRuntimeSecuritySettings();

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return { ok: false, status: 401, message: 'Not authorized, user not found' };
    }

    if (!decoded.sessionId) {
      return { ok: false, status: 401, message: 'Not authorized, invalid session' };
    }

    const session = Array.isArray(user.sessions)
      ? user.sessions.find((item) => item.sessionId === decoded.sessionId)
      : null;

    if (!session) {
      return { ok: false, status: 401, message: 'Not authorized, session revoked' };
    }

    const nowMs = Date.now();
    const lastSeenMs = session.lastSeenAt ? new Date(session.lastSeenAt).getTime() : Number.NaN;
    const createdAtMs = session.createdAt ? new Date(session.createdAt).getTime() : Number.NaN;
    const activityMs = Number.isFinite(lastSeenMs) ? lastSeenMs : createdAtMs;

    // Migration path: legacy sessions (without lastSeenAt) are accepted once and upgraded.
    const shouldApplyTimeout = Boolean(session.lastSeenAt);
    const isTimedOut = shouldApplyTimeout
      && Number.isFinite(activityMs)
      && nowMs - activityMs > sessionTimeoutMs;

    if (isTimedOut) {
      user.sessions = user.sessions.filter((item) => item.sessionId !== decoded.sessionId);
      await user.save({ validateBeforeSave: false });
      return { ok: false, status: 401, message: 'Not authorized, session expired' };
    }

    const shouldRefreshActivity = !session.lastSeenAt
      || (Number.isFinite(activityMs) && nowMs - activityMs >= SESSION_ACTIVITY_REFRESH_MS);

    if (shouldRefreshActivity) {
      session.lastSeenAt = new Date(nowMs);
      await user.save({ validateBeforeSave: false });
    }

    req.user = user;
    req.sessionId = decoded.sessionId;
    return { ok: true };
  };

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const result = await attachUserFromToken(token);
      if (!result.ok) {
        return res.status(result.status).json({ message: result.message });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        message: error.name === 'TokenExpiredError'
          ? 'Not authorized, token expired'
          : 'Not authorized, invalid token'
      });
    }
  }

  if (!token && req.query?.token) {
    try {
      token = req.query.token;

      const result = await attachUserFromToken(token);
      if (!result.ok) {
        return res.status(result.status).json({ message: result.message });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Role authorization
const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

module.exports = { protect, authorize };
