const {
  getAdmins,
  createAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  updateLastActive,
  resolveRequesterProfile,
} = require('../services/admin.service');

/**
 * GET /api/admin-management
 */
async function listAdmins(req, res) {
  try {
    const requester = await resolveRequesterProfile(req.user);
    const data = await getAdmins(req.query);
    return res.status(200).json({
      ...data,
      requester: { _id: requester._id, role: requester.role, status: requester.status },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message || 'Failed to fetch admins.' });
  }
}

/**
 * POST /api/admin-management
 */
async function addAdmin(req, res) {
  try {
    const requester = req.adminProfile || (await resolveRequesterProfile(req.user));
    const payload = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      addedBy: requester._id,
    };

    const admin = await createAdmin(payload);
    return res.status(201).json(admin);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message || 'Failed to create admin.' });
  }
}

/**
 * GET /api/admin-management/:id
 */
async function getAdmin(req, res) {
  try {
    const requester = await resolveRequesterProfile(req.user);
    const admin = await getAdminById(req.params.id);

    const isSelf = String(admin._id) === String(requester._id);
    const isSuper = requester.role === 'super_admin';
    if (!isSelf && !isSuper) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    return res.status(200).json(admin);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message || 'Failed to fetch admin.' });
  }
}

/**
 * PATCH /api/admin-management/:id
 */
async function patchAdmin(req, res) {
  try {
    const requester = req.adminProfile || (await resolveRequesterProfile(req.user));
    const admin = await updateAdmin(req.params.id, req.body, requester);
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message || 'Failed to update admin.' });
  }
}

/**
 * DELETE /api/admin-management/:id
 */
async function removeAdmin(req, res) {
  try {
    const requester = req.adminProfile || (await resolveRequesterProfile(req.user));
    const result = await deleteAdmin(req.params.id, requester);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message || 'Failed to delete admin.' });
  }
}

/**
 * PATCH /api/admin-management/me/last-active
 */
async function patchMyLastActive(req, res) {
  try {
    const requester = await resolveRequesterProfile(req.user);
    const result = await updateLastActive(requester._id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message || 'Failed to update last active.' });
  }
}

module.exports = {
  listAdmins,
  addAdmin,
  getAdmin,
  patchAdmin,
  removeAdmin,
  patchMyLastActive,
};
