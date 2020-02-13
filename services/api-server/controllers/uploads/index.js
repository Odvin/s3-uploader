const createError = require('http-errors');

const getUserUploads = require('./getUserUploads');

async function list(req, res, next) {
  try {
    const { userId } = req.params;
    const { isValidUserId, uploads } = await getUserUploads(userId);

    if (!isValidUserId) {
      return next(createError(422, 'Incorrect User ID'));
    }

    return res.json(uploads);
  } catch (e) {
    return next(e);
  }
}

module.exports = { list };
