const { removeCase, isCaseExists } = require('../../models/cases');

async function removeUploadCase(caseId) {
  let isRemoved = false;

  if (await isCaseExists(caseId)) {
    const { deletedCount } = await removeCase(caseId);
    isRemoved = Boolean(deletedCount);
  }

  return isRemoved;
}

module.exports = removeUploadCase;
