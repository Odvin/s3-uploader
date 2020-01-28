const createError = require('http-errors');
const { body, query, validationResult } = require('express-validator');

const getUserQuota = require('./getUserQuota');
const checkUserQuota = require('./checkUserQuota');
const createPreSignedPostUrl = require('./createPreSignedPostUrl');

function validate(method) {
  switch (method) {
    case 'preSignedUrl': {
      return [
        body('userId', 'User id is required').isMongoId(),
        body('useCase', 'Define use case').isString(),
        body('fileName', 'File name is required').isString(),
        body('fileType', 'File type is required').isString(),
        body('fileSize', 'File size is required').isNumeric()
      ];
    }
    case 'quota': {
      return [query('id', 'User id is required').isMongoId()];
    }
  }
}

async function preSignedUrl(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return next(
        createError(422, 'Incorrect request for the file upload', {
          errors: errors.array()
        })
      );

    const fileInfo = req.body;

    const acceptable = await checkUserQuota(fileInfo);

    if (!acceptable) {
      return next(createError(422, 'Quota limitation for the file upload'));
    }

    const url = await createPreSignedPostUrl(fileInfo);

    return res.json(url);
  } catch (e) {
    return next(e);
  }
}

async function quota(req, res, next) {
  try {
    console.log(req.query);

    const errors = validationResult(req);

    if (!errors.isEmpty())
      return next(
        createError(422, 'Incorrect user Id', {
          errors: errors.array()
        })
      );

    const { id: userId } = req.query;

    const quota = await getUserQuota(userId);

    return res.json(quota);
  } catch (e) {
    return next(e);
  }
}

module.exports = { preSignedUrl, quota, validate };
