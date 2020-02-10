const { getAllUploadCases } = require('../../models/cases');

async function uploadCases() {
  return getAllUploadCases();
}

module.exports = uploadCases;
