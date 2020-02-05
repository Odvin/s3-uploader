const redis = require('../../redis');

async function setObjectCache(payload) {
  const key = payload.id;
  const data = JSON.stringify(payload);
  
  return redis.set(key, data, 'EX', 100000);
}

module.exports = setObjectCache;
