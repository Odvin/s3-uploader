const createError = require('http-errors');
const uploadCases = require('./uploadCases');
const createUploadCase = require('./createUploadCase');
const updateUploadCase = require('./updateUploadCase');

const {
  createUploadCaseValidation,
  updateUploadCaseValidation
} = require('./validations');

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
    const uploadCase = req.body;
    const isValid = updateUploadCaseValidation(uploadCase);

    if (!isValid) {
      return next(
        createError(422, 'Incorrect request for the case upload update', {
          errors: createUploadCaseValidation.errors
        })
      );
    }

    const { isValidUploadCaseId, updatedUploadCase } = await updateUploadCase(
      uploadCase
    );

    if (!isValidUploadCaseId) {
      return next(createError(422, 'Incorrect case upload ID'));
    }

    return res.json(updatedUploadCase);
  } catch (e) {
    return next(e);
  }
}

module.exports = { list, create, update };
