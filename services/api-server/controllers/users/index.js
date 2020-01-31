const createError = require('http-errors');
const { body, query, validationResult } = require('express-validator');

const getUserQuota = require('./getUserQuota');
const checkUserQuota = require('./checkUserQuota');
const createPreSignedPostUrl = require('./createPreSignedPostUrl');
const {
  setObjectCache,
  getObjectCache,
  clearObjectCache
} = require('../../redis/objectCache');

const { createUpload, persistUserUpload } = require('../../models/upload');

function validate(method) {
  switch (method) {
    case 'preSignedUrl': {
      return [
        body('userId', 'User id is required').isMongoId(),
        body('case', 'Define use case').isString(),
        body('fileName', 'File name is required').isString(),
        body('fileType', 'File type is required').isString(),
        body('fileSize', 'File size is required').isNumeric()
      ];
    }
    case 'persistUpload': {
      return [
        body('uploadId', 'User id is required').isMongoId(),
        body('bucket', 'Define use case').isString(),
        body('key', 'File name is required').isString(),
        body('location', 'File type is required').isString()
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

    const upload = await checkUserQuota(fileInfo);

    if (!upload.acceptable) {
      return next(createError(422, 'Quota limitation for the file upload'));
    }

    const url = await createPreSignedPostUrl(upload);

    await setObjectCache(upload);

    return res.json({ url, uploadId: upload.id });
  } catch (e) {
    return next(e);
  }
}

async function persistUpload(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return next(
        createError(422, 'Incorrect request for the persist file upload', {
          errors: errors.array()
        })
      );

    const { uploadId, bucket, location, key } = req.body;

    const upload = await getObjectCache(uploadId);

    if (!(upload.bucket === bucket && upload.key === key))
      return next(createError(422, 'Can not persist file upload'));

    const uploadInfo = {
      _id: uploadId,
      userId: upload.userId,
      case: upload.case,
      name: upload.fileName,
      location,
      bucket,
      mime: upload.mimeType,
      size: upload.fileSize
    };

    await persistUserUpload(uploadInfo);

    clearObjectCache(uploadId);

    return res.json({ result: 'Ok' });
  } catch (e) {
    return next(e);
  }
}

async function quota(req, res, next) {
  try {
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

module.exports = { preSignedUrl, persistUpload, quota, validate };
