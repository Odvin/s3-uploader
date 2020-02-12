const { userUploads } = require('../../models/uploads');

module.exports = async function getUserUploads(userId) {
  return userUploads(userId);

}