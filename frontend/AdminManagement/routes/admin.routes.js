const express = require('express');
const { protect } = require('../../../backend/middleware/authMiddleware');
const { checkBan } = require('../../Moderation/middleware/checkBan.middleware');
const { superAdminOnly } = require('../middleware/superAdminOnly.middleware');
const {
  listAdmins,
  addAdmin,
  getAdmin,
  patchAdmin,
  removeAdmin,
  patchMyLastActive,
} = require('../controllers/admin.controller');

const router = express.Router();

const blockSuperAdminAssignment = (req, res, next) => {
  if (req.body?.role === 'super_admin') {
    return res.status(403).json({ message: 'Super Admin role cannot be assigned via this endpoint.' });
  }
  return next();
};

router.use(protect);
router.use(checkBan);

router.get('/', listAdmins);
router.get('/:id', getAdmin);
router.patch('/me/last-active', patchMyLastActive);

router.post('/', superAdminOnly, blockSuperAdminAssignment, addAdmin);
router.patch('/:id', superAdminOnly, blockSuperAdminAssignment, patchAdmin);
router.delete('/:id', superAdminOnly, removeAdmin);

module.exports = router;
