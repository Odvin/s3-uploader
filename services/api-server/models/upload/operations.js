const mongoose = require('mongoose');
const Upload = require('./upload');

async function createUpload(upload) {
  const newUpload = new Upload(upload);
  return newUpload.save();
}

const findUploadById = async uploadId => {
  return Upload.findById(uploadId, null, { lean: true }) || {};
};

function createUploadId() {
  return mongoose.Types.ObjectId();
}

module.exports = {
  createUpload,
  findUploadById,
  createUploadId
};
