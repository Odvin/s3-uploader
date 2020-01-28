const { findUserById } = require('../../models/user');

module.exports = async function getUserQuota(userId) {
  return findUserById(userId);
}