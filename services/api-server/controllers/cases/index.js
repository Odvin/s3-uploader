const uploadCases = require('./uploadCases');

async function list(req, res, next) {
  try {
    const cases = await uploadCases();
    return res.json(cases);
  } catch (e) {
    return next(e);
  }
}

module.exports = { list };
