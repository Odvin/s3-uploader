const { userStorageUsage } = require('../../models/users');

module.exports = async function getUserStorageUsage(userId) {
  return userStorageUsage(userId);

}