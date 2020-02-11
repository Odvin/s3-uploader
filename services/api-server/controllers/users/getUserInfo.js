const { userInfo } = require('../../models/users');

module.exports = async function getUserInfo(userId) {
  return userInfo(userId);

}