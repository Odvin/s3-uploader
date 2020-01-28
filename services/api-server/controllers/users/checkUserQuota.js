const { findUserById } = require('../../models/user');

module.exports = async function checkUserQuota(fileInfo) {
  const user = await findUserById(fileInfo.userId);

  const [useCase] = user.uploads.filter(
    upload => upload.useCase === fileInfo.useCase
  );

  if (!useCase) {
    return false;
  }

  if (!(useCase.fileType || []).includes(fileInfo.fileType)) {
    return false;
  }

  if (
    fileInfo.fileSize < useCase.minSize ||
    useCase.maxSize < fileInfo.fileSize
  ) {
    return false;
  }

  if (user.storageUsage + fileInfo.fileSize > user.storageSize) {
    return false;
  }

  return true;
};
