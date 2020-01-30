const { userQuotas } = require('../../models/user');
const { createUploadId } = require('../../models/upload');

module.exports = async function checkUserQuota(fileInfo) {
  const upload = {
    acceptable: false
  };

  const user = await userQuotas(fileInfo.userId);

  const [uploadCase] = user.cases.filter(
    upload => upload.case === fileInfo.case
  );

  if (!uploadCase) {
    return upload;
  }

  if (!(uploadCase.mineTypes || []).includes(fileInfo.fileType)) {
    return upload;
  }

  if (
    fileInfo.fileSize < uploadCase.minSize ||
    uploadCase.maxSize < fileInfo.fileSize
  ) {
    return upload;
  }

  if (user.storageUsage + fileInfo.fileSize > user.storageSize) {
    return upload;
  }

  upload.acceptable = true;
  upload.mineType = fileInfo.fileType;
  upload.maxSize = uploadCase.maxSize;
  upload.minSize = uploadCase.minSize;
  upload.fileSize = fileInfo.fileSize;
  upload.reseller = user.reseller;
  upload.case = fileInfo.case;
  upload.userId = fileInfo.userId;
  upload.fileName = fileInfo.fileName;
  upload.id = createUploadId();

  return upload;
};
