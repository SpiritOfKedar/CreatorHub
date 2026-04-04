const jwt = require('jsonwebtoken');
const User = require('../../../backend/models/User');
const { ensureRequesterAdminProfile } = require('../services/admin.service');

/**
 * Guard write endpoints for super admins only.
 */
async function superAdminOnly(req, res, next) {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    if (!req.user) {
      const auth = req.headers.authorization || '';
      const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
      if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    const adminProfile = await ensureRequesterAdminProfile(req.user);
    if (!adminProfile || adminProfile.role !== 'super_admin') {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    req.adminProfile = adminProfile;

    if (req.method === 'DELETE' && req.params?.id && String(req.params.id) === String(adminProfile._id)) {
      return res.status(403).json({ message: 'Cannot delete your own account.' });
    }

    return next();
  } catch (_error) {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }
}

module.exports = { superAdminOnly };
