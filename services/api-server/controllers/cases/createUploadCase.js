const { createCase } = require('../../models/cases');

async function createUploadCase(uploadCase) {
  return createCase(uploadCase)
}

module.exports = createUploadCase;