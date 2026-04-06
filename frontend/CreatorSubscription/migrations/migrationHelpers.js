const sleep = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

const formatDuration = (startTime) => {
  const elapsedMs = Date.now() - Number(startTime || Date.now());
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
};

const processBatch = async (items, batchSize, asyncFn) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += batchSize) {
    chunks.push(items.slice(i, i + batchSize));
  }

  const summary = { success: 0, skipped: 0, failed: 0, failedIds: [] };

  for (let i = 0; i < chunks.length; i += 1) {
    const batch = chunks[i];
    console.log(`Processing batch ${i + 1} / ${chunks.length}...`);

    // sequential within a batch to keep connection pressure stable
    for (const item of batch) {
      try {
        const result = await asyncFn(item);
        if (result === 'skipped') summary.skipped += 1;
        else summary.success += 1;
      } catch (error) {
        summary.failed += 1;
        summary.failedIds.push(String(item?._id || item?.creatorId || 'unknown'));
        console.error(`✗ Failed ${String(item?._id || 'unknown')}: ${error.message}`);
      }
    }

    await sleep(100);
  }

  return summary;
};

module.exports = {
  processBatch,
  sleep,
  formatDuration,
};
