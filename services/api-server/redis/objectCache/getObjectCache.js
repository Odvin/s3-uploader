const redis = require('../../redis');

async function getObjectCache(key) {
  const data = await redis.get(key);

  return JSON.parse(data);
}

module.exports = getObjectCache;
