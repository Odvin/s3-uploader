const router = require('express').Router();
const { users } = require('../../controllers/');

router.post(
  '/pre-signed-url',
  users.validate('preSignedUrl'),
  users.preSignedUrl
);

router.get('/quota', users.validate('quota'), users.quota);

module.exports = router;
