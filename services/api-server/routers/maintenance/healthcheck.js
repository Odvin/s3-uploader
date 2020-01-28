const router = require('express').Router();

const { connection } = require('../../models');

router.get('/liveness', async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (e) {
    return next(e);
  }
});

router.get('/readiness', async (req, res, next) => {
  try {
    if (connection.states.connected) {
      return res.sendStatus(200);
    }

    return res.sendStatus(503);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
