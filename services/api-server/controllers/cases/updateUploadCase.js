const { updateCase, isCaseExists } = require('../../models/cases');

async function updateUploadCase(uploadCase) {
  const result = {
    isValidUploadCaseId: false,
    updatedUploadCase: null
  };

  if (await isCaseExists(uploadCase.caseId)) {
    result.updatedUploadCase = await updateCase(uploadCase);
    result.isValidUploadCaseId = true;
  }

  return result;
}

module.exports = updateUploadCase;
