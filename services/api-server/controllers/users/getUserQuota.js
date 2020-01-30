const { userQuotas } = require('../../models/user');

module.exports = async function getUserQuota(userId) {
  return userQuotas(userId);

}