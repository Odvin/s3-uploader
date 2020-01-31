const redis = require('../../redis');

async function clearObjectCache(key) {
  return redis.del(key);
}

module.exports = clearObjectCache;
