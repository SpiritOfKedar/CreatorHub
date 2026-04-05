const { AppSetting } = require('../models/AdminData');

const checkFeatureToggle = (featureName) => {
  return async (req, res, next) => {
    try {
      const settings = await AppSetting.findOne().lean();
      
      if (!settings || !settings.toggles) {
        return next();
      }
      
      // Strict falsy check to handle Boolean false properly
      const isEnabled = settings.toggles[featureName];
      
      if (isEnabled === false || isEnabled === 'false') {
        return res.status(403).json({ 
          error: 'FeatureDisabled',
          message: `The ${featureName} feature has been disabled by the administrator.` 
        });
      }
      
      next();
    } catch (err) {
      console.error('Feature toggle middleware error:', err);
      res.status(500).json({ error: 'Server error checking feature permissions.' });
    }
  };
};

module.exports = { checkFeatureToggle };
