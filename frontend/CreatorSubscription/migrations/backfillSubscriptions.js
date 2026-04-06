const fs = require('fs');
const path = require('path');
const mongoose = require('../../Moderation/models/_mongoose');
const Creator = require('../../../backend/models/Creator');
const Subscription = require('../models/SubscriptionModel');
const { processBatch, formatDuration } = require('./migrationHelpers');

const BATCH_SIZE = 100;

(async () => {
  const startTime = Date.now();
  const failedLogPath = path.join(process.cwd(), 'failed_migrations.log');

  try {
    const envPath = path.join(__dirname, '../../../backend/.env');
    require('dotenv').config({ path: envPath });

    await mongoose.connect(process.env.MONGODB_URI);

    const creators = await Creator.find({
      $or: [{ subscriptionId: null }, { subscriptionId: { $exists: false } }],
    })
      .select('_id createdAt')
      .lean();

    console.log(`Found ${creators.length} creators without subscription.`);

    const summary = await processBatch(creators, BATCH_SIZE, async (creator) => {
      const exists = await Subscription.findOne({ creatorId: creator._id }).select('_id').lean();
      if (exists) return 'skipped';

      const subscription = await Subscription.create({
        creatorId: creator._id,
        plan: 'free',
        status: 'active',
        billingCycle: 'forever',
        platformFeePercent: 15,
        hasSeenOnboarding: false,
        isBackfilled: true,
      });

      await Creator.updateOne({ _id: creator._id }, { $set: { subscriptionId: subscription._id } });
      console.log(`✓ ${creator._id} → free subscription created`);
      return 'success';
    });

    fs.writeFileSync(failedLogPath, summary.failedIds.join('\n'));

    console.log('─────────────────────────────');
    console.log(`Migration complete in ${formatDuration(startTime)}`);
    console.log(`Total found    : ${creators.length}`);
    console.log(`Created        : ${summary.success}`);
    console.log(`Skipped        : ${summary.skipped}`);
    console.log(`Failed         : ${summary.failed}`);
    console.log('(see failed_migrations.log)');
    console.log('─────────────────────────────');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Migration failed:', error.message);
    try {
      await mongoose.connection.close();
    } catch (_error) {}
    process.exit(1);
  }
})();
