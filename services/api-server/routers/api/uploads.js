const router = require('express').Router();
const { uploads } = require('../../controllers');

router.get('/list', uploads.list);
