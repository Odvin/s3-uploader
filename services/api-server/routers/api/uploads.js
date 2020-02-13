const router = require('express').Router();
const { uploads } = require('../../controllers');

router.get('/list/:userId', uploads.list);

module.exports = router;