const { userInfo } = require('../../models/users');
const { createUploadId } = require('../../models/uploads');

module.exports = async function checkUserQuota(fileInfo) {
  const upload = {
    acceptable: false
  };

  const user = await userInfo(fileInfo.userId);

  const [uploadCase] = user.cases.filter(
    upload => upload.name === fileInfo.case
  );

  if (!uploadCase) {
    return upload;
  }

  if (!(uploadCase.mimes || []).includes(fileInfo.fileType)) {
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
  upload.id = createUploadId();
  upload.bucket = 'site-plus-direct-upload';
  upload.mimeType = fileInfo.fileType;
  upload.maxSize = uploadCase.maxSize;
  upload.minSize = uploadCase.minSize;
  upload.fileSize = fileInfo.fileSize;
  upload.case = fileInfo.case;
  upload.userId = fileInfo.userId;
  upload.fileName = fileInfo.fileName;
  upload.key = `${user.reseller}/${upload.userId}/${fileInfo.case}/${upload.id}/${fileInfo.fileName}`;

  return upload;
};
