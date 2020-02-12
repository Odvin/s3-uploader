const {
  createUser,
  updateUser,
  isUserExists,
  findUserById,
  seedUser,
  userInfo,
  userStorageUsage
} = require('./operations');

module.exports = {
  seedUser,
  createUser,
  updateUser,
  isUserExists,
  findUserById,
  userInfo,
  userStorageUsage
};
