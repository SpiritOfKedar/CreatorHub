const express = require('express');
const Subscription = require('../models/SubscriptionModel');
const Creator = require('../../../backend/models/Creator');
const { createFreeIfMissing } = require('../services/subscriptionGuard.service');
const {
  getSubscriptionHandler,
  onboardingStatusHandler,
  activateFreePlanHandler,
  activateProPlanHandler,
  submitEnterpriseHandler,
  cancelProHandler,
  markOnboardingSeenHandler,
} = require('../controllers/subscription.controller');

const router = express.Router();

const ensureSubscriptionExists = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ success: false, message: 'Not authorized' });

    const creator = await Creator.findOne({ userId: String(userId) }).select('_id').lean();
    if (!creator?._id) {
      return res.status(404).json({ success: false, message: 'Creator profile not found' });
    }

    const existing = await Subscription.findOne({ creatorId: creator._id }).select('_id').lean();
    if (!existing) {
      await createFreeIfMissing(creator._id, false);
    }

    return next();
  } catch (_error) {
    return res.status(500).json({ success: false, message: 'Unable to initialize subscription' });
  }
};

router.use(ensureSubscriptionExists);

router.get('/', getSubscriptionHandler);
router.get('/onboarding-status', onboardingStatusHandler);
router.post('/free', activateFreePlanHandler);
router.post('/pro', activateProPlanHandler);
router.post('/enterprise', submitEnterpriseHandler);
router.delete('/pro', cancelProHandler);
router.patch('/onboarding/seen', markOnboardingSeenHandler);

module.exports = router;
