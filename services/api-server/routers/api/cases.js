const router = require('express').Router();
const { cases } = require('../../controllers');

router.get('/', cases.list);

module.exports = router;
