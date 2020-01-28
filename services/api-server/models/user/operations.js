const User = require('./user');

async function createUser(user) {
  const newUser = new User(user);
  return newUser.save();
}

const findUserById = async userId => {
  return User.findById(userId, null, { lean: true }) || {};
};

const seedUser = async users => {
  console.log(users);
  
  await User.deleteMany({});
  await User.insertMany(users);

  return 'Users seeding is done.';
};

module.exports = {
  createUser,
  findUserById,
  seedUser
};
