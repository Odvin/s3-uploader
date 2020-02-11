const {
  createUser,
  findUserById,
  seedUser,
  userInfo,
  updateUser,
  isUserExists
} = require('./operations');

module.exports = {
  createUser,
  updateUser,
  isUserExists,
  findUserById,
  userInfo,
  seedUser
};
