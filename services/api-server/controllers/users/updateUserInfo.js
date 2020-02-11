const { updateUser, isUserExists, userInfo } = require('../../models/users');

async function updateUserInfo(info) {
  const result = {
    isValidUserId: false,
    updatedUserInfo: null
  };

  if (await isUserExists(info.userId)) {
    const { _id: userId } = await updateUser(info);
    result.updatedUserInfo = await userInfo(userId);
    result.isValidUserId = true;

    console.log(result.updatedUserInfo);
  }

  return result;
}

module.exports = updateUserInfo;
