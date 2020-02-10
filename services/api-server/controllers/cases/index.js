const uploadCases = require('./uploadCases');
const createUploadCase = require('./createUploadCase');

const { createUploadCaseValidation } = require('./validations');

async function list(req, res, next) {
  try {
    const cases = await uploadCases();
    return res.json(cases);
  } catch (e) {
    return next(e);
  }
}

async function create(req, res, next) {
  try {
    const uploadCase = req.body;
    const isValid = createUploadCaseValidation(uploadCase);

    if (!isValid) {
      return res.status(400).json(createUploadCaseValidation.errors);
    }

    const newUploadCase = await createUploadCase(req.body);
    return res.json(newUploadCase);
  } catch (e) {
    return next(e);
  }
}

async function update(req, res, next) {
  try {
    console.log('Update Upload Case')
    return res.json({ action: 'Update Upload Case' });
  } catch (e) {
    return next(e);
  }
}

module.exports = { list, create, update };
