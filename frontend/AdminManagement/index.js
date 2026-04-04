const AdminModel = require('./models/AdminModel');
const adminService = require('./services/admin.service');
const adminAuthService = require('./services/adminAuth.service');
const adminController = require('./controllers/admin.controller');
const adminRoutes = require('./routes/admin.routes');
const { superAdminOnly } = require('./middleware/superAdminOnly.middleware');
const adminConstants = require('./utils/adminConstants');
const adminHelpers = require('./utils/adminHelpers');

module.exports = {
  AdminModel,
  ...adminService,
  ...adminAuthService,
  ...adminController,
  adminRoutes,
  superAdminOnly,
  ...adminConstants,
  ...adminHelpers,
};
