const mongoose = require('mongoose');
const Users = require('./users');

async function createUser(user) {
  const newUser = new Users(user);
  return newUser.save();
}

async function updateUser(userInfo) {
  const { userId: _id } = userInfo;
  delete userInfo.userId;
  return Users.findByIdAndUpdate({ _id }, userInfo, {
    lean: true,
    new: true
  });
}

async function isUserExists(userId) {
  let doc = {};

  if (mongoose.Types.ObjectId.isValid(userId)) {
    doc = await Users.findById(userId, '_id', { lean: true }).limit(1);
  }

  return Boolean(doc._id);
}

const findUserById = async userId => {
  return Users.findById(userId, null, { lean: true });
};

async function userInfo(userId) {
  return Users.findById(userId, null, { lean: true }).populate({
    path: 'cases'
  });
}

const seedUser = async users => {
  await Users.deleteMany({});
  const test = await Users.insertMany(users);
  console.log(test);

  return 'Users seeding is done.';
};

async function userStorageUsage (userId) {
  const result = { isValidUserId: false, storage: {} };

  if (mongoose.Types.ObjectId.isValid(userId)) {
    const { storageUsage, storageSize } = await Users.findById(userId, 'storageUsage storageSize', { lean: true }).limit(1);

    result.isValidUserId = true;
    result.storage.storageUsage = storageUsage;
    result.storage.storageSize = storageSize;
  }

  return result;
}

module.exports = {
  createUser,
  updateUser,
  isUserExists,
  userStorageUsage,
  findUserById,
  userInfo,
  seedUser
};
