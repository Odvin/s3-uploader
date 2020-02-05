const User = require('./user');

async function createUser(user) {
  const newUser = new User(user);
  return newUser.save();
}

const findUserById = async userId => {
  return User.findById(userId, null, { lean: true }) || {};
};

async function userQuotas(userId) {
  return User.findById(userId, null, {lean: true}).populate({path: 'cases'}) || {};
}

const seedUser = async users => {
  await User.deleteMany({});
  const test = await User.insertMany(users);
  console.log(test);

  return 'Users seeding is done.';
};

module.exports = {
  createUser,
  findUserById,
  userQuotas,
  seedUser
};
