const Cases = require('./cases');

async function createCase(user) {
  const newCase = new Cases(user);
  return newCase.save();
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
  findCaseById,
  getAllCasesIds,
  getAllUploadCases,
  seedCases
};
