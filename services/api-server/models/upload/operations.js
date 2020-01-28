const Upload = require('./upload');

async function createUpload(upload) {
  const newUpload = new Upload(upload);
  return newUpload.save();
}

const findUploadById = async uploadId => {
  return Upload.findById(uploadId, null, { lean: true }) || {};
};

module.exports = {
  createUpload,
  findUploadById
};
