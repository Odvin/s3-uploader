const { createUser, userInfo } = require('../../models/users');

async function createUserInfo(info) {
  info.storageUsage = 0;
  const {_id: userId} = await createUser(info);
  return userInfo(userId);
}

module.exports = createUserInfo;