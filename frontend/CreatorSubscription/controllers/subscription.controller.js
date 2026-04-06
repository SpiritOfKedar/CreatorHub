const {
  getSubscription,
  activateFreePlan,
  activateProPlan,
  cancelProPlan,
  markOnboardingSeen,
} = require('../services/subscription.service');
const { submitEnterpriseRequest, enterpriseSchema, approveEnterpriseRequest } = require('../services/enterprise.service');
const { checkAndInitSubscription } = require('../services/subscriptionGuard.service');

const getAuthUserId = (req) => req.user?._id || req.user?.userId;

const handleError = (res, error) => {
  if (error?.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.issues,
    });
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Something went wrong',
  });
};

const getSubscriptionHandler = async (req, res) => {
  try {
    const subscription = await getSubscription(getAuthUserId(req));
    return res.status(200).json({ success: true, subscription });
  } catch (error) {
    return handleError(res, error);
  }
};

const onboardingStatusHandler = async (req, res) => {
  try {
    const result = await checkAndInitSubscription(getAuthUserId(req));
    return res.status(200).json({
      success: true,
      plan: result.plan,
      showOnboarding: result.showOnboarding,
      isExistingCreator: result.isExistingCreator,
      subscription: result.subscription,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

const activateFreePlanHandler = async (req, res) => {
  try {
    const subscription = await activateFreePlan(getAuthUserId(req));
    return res.status(200).json({ success: true, subscription });
  } catch (error) {
    return handleError(res, error);
  }
};

const activateProPlanHandler = async (req, res) => {
  try {
    const subscription = await activateProPlan(getAuthUserId(req));
    return res.status(200).json({ success: true, subscription });
  } catch (error) {
    return handleError(res, error);
  }
};

const submitEnterpriseHandler = async (req, res) => {
  try {
    const payload = enterpriseSchema.parse(req.body);
    const subscription = await submitEnterpriseRequest(getAuthUserId(req), payload);
    return res.status(200).json({ success: true, subscription });
  } catch (error) {
    return handleError(res, error);
  }
};

const cancelProHandler = async (req, res) => {
  try {
    const subscription = await cancelProPlan(getAuthUserId(req));
    return res.status(200).json({ success: true, subscription });
  } catch (error) {
    return handleError(res, error);
  }
};

const markOnboardingSeenHandler = async (req, res) => {
  try {
    const subscription = await markOnboardingSeen(getAuthUserId(req));
    return res.status(200).json({ success: true, subscription });
  } catch (error) {
    return handleError(res, error);
  }
};

const approveEnterpriseHandler = async (req, res) => {
  try {
    const adminIdentity = req.adminProfile || req.user;
    const subscription = await approveEnterpriseRequest(req.params.subscriptionId, adminIdentity, req.body?.notes || '');
    return res.status(200).json({ success: true, subscription });
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = {
  getSubscriptionHandler,
  onboardingStatusHandler,
  activateFreePlanHandler,
  activateProPlanHandler,
  submitEnterpriseHandler,
  cancelProHandler,
  markOnboardingSeenHandler,
  approveEnterpriseHandler,
};
