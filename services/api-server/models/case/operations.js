const Case = require('./case');

async function createCase(user) {
  const newCase = new Case(user);
  return newCase.save();
}

const findCaseById = async caseId => {
  return Case.findById(caseId, null, { lean: true }) || {};
};

async function getAllCasesIds() {
  return Case.find({}, '_id', { lean: true }) || [{}];
}

const seedCase = async cases => {
  await Case.deleteMany({});
  await Case.insertMany(cases);

  return 'Users seeding is done.';
};

module.exports = {
  createCase,
  findCaseById,
  getAllCasesIds,
  seedCase
};
