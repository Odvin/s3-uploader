const router = require('express').Router();
const { users } = require('../../controllers');

router.post(
  '/pre-signed-url',
  users.validate('preSignedUrl'),
  users.preSignedUrl
);

router.post(
  '/persist-upload',
  users.validate('persistUpload'),
  users.persistUpload
);

router.get('/quota', users.validate('quota'), users.quota);

router.get('/storage-usage/:userId', users.storageUsage);

router.post('/', users.create);
router.put('/', users.update);

module.exports = router;
