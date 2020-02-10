const mongoose = require('mongoose');
const Cases = require('./cases');

async function createCase(uploadCase) {
  const newCase = new Cases(uploadCase);
  return newCase.save();
}

async function updateCase(uploadCase) {
  const { caseId: _id } = uploadCase;
  delete uploadCase.caseId;
  return Cases.findByIdAndUpdate({ _id }, uploadCase, {
    lean: true,
    new: true
  });
}

async function isCaseExists(caseId) {
  let doc = {};

  if (mongoose.Types.ObjectId.isValid(caseId)) {
    doc = await Cases.findById(caseId, '_id', { lean: true }).limit(1);
  }

  return Boolean(doc._id);
}

async function removeCase(caseId) {
  return Cases.deleteOne({ _id: caseId }, { lean: true });
}

const findCaseById = async caseId => {
  return Cases.findById(caseId, null, { lean: true }) || {};
};

async function getAllCasesIds() {
  return Cases.find({}, '_id', { lean: true }) || [{}];
}

async function getAllUploadCases() {
  return Cases.find({}, '-__v', { lean: true }) || [{}];
}

const seedCases = async cases => {
  await Cases.deleteMany({});
  await Cases.insertMany(cases);

  return 'Users seeding is done.';
};

module.exports = {
  createCase,
  updateCase,
  removeCase,
  isCaseExists,
  findCaseById,
  getAllCasesIds,
  getAllUploadCases,
  seedCases
};
