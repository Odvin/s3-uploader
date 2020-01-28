const router = require('express').Router();

const { seedUser } = require('../../models/user');
const { users } = require('../../models/seeds.json');

router.get('/', async (req, res, next) => {
  try {
    console.log('===== Seeding Users =====');
    console.log(users)
    const seedingResult = await seedUser(users);

    return res.send(seedingResult);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;