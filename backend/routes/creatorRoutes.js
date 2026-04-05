const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { checkBan } = require('../../frontend/Moderation/middleware/checkBan.middleware');
const { checkFeatureToggle } = require('../middleware/featureToggleMiddleware');
const {
  getDashboardData,
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  updateSocialLinks,
  getSocialLinks,
  getAnalytics,
  getSubscribers,
  getInsightsData,
  updateCreatorProfile,
  getNotifications,
  markAllCreatorNotificationsRead,
  markNotificationRead,
  getPayoutSettings,
  updatePayoutSettings,
  getFeatureAvailability,
  createLivestream,
  getLivestreams,
  getMessages,
  uploadMessageMediaHandler,
  sendMessage,
  deleteMessage,
  editMessage,
  reactToMessage,
  blockUser,
  getBlockStatus,
  markConversationSeen
} = require('../controllers/creatorController');

router.use(protect);
router.use(checkBan);
router.use(authorize('creator'));

router.get('/dashboard', getDashboardData);
router.get('/features', getFeatureAvailability);
router.put('/update-profile', updateCreatorProfile);
router.get('/analytics', getAnalytics);
router.get('/subscribers', getSubscribers);
router.get('/insights', getInsightsData);

// Notifications
router.get('/notifications', getNotifications);
router.put('/notifications/mark-all-read', markAllCreatorNotificationsRead);
router.put('/notifications/:id/read', markNotificationRead);

// Payouts
router.get('/payout-settings', getPayoutSettings);
router.put('/payout-settings', updatePayoutSettings);

// Livestreams
router.post('/livestreams', checkFeatureToggle('livestreaming'), createLivestream);
router.get('/livestreams', getLivestreams);

// Messaging
router.get('/messages', checkFeatureToggle('messaging'), getMessages);
router.post('/messages/upload-media', checkFeatureToggle('messaging'), uploadMessageMediaHandler);
router.post('/messages', checkFeatureToggle('messaging'), sendMessage);
router.put('/messages/seen/:conversationId', checkFeatureToggle('messaging'), markConversationSeen);
router.put('/messages/:id/delete', checkFeatureToggle('messaging'), deleteMessage);
router.put('/messages/:id/edit', checkFeatureToggle('messaging'), editMessage);
router.post('/messages/:id/react', reactToMessage);
router.post('/block/:userId', blockUser);
router.get('/block/:userId', getBlockStatus);

// Post routing
router.post('/posts', createPost);
router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

// Social links routing
router.get('/social-links', getSocialLinks);
router.post('/social-links', updateSocialLinks);

module.exports = router;
