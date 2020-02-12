const mongoose = require('mongoose');
const Uploads = require('./uploads');
const Users   = require('../users/users');

async function createUpload(upload) {
  const newUpload = new Uploads(upload);
  return newUpload.save();
}

async function persistUserUpload(uploadInfo) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();


    const user = await Users.findById(uploadInfo.userId).session(session);
    user.storageUsage += uploadInfo.size;

    if (user.storageUsage > user.storageSize) {
      throw new Error(`User :: ${user._id} storage size limit expended`);
    }

    await user.save();
    
    await Uploads.create([uploadInfo], { session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

async function findUploadById(uploadId) {
  return Uploads.findById(uploadId, null, { lean: true }) || {};
}

async function seedUpload(uploads) {
  await Uploads.deleteMany({});
  await Uploads.insertMany(uploads);
}

function createUploadId() {
  return mongoose.Types.ObjectId();
}

module.exports = {
  createUpload,
  findUploadById,
  createUploadId,
  persistUserUpload,
  seedUpload
};
