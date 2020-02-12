const router = require('express').Router();

const { seedCases, getAllCasesIds } = require('../../models/cases');
const { seedUser } = require('../../models/users');
const Uploads = require('../../models/uploads/uploads');

const { users, cases } = require('../../models/seeds.json');

router.get('/', async (req, res, next) => {
  try {
    console.log('===== Seeding =====');
    await seedCases(cases);
    const caseIds = await getAllCasesIds();

    const preparedUses = users.map(user => ({
      ...user,
      cases: caseIds
    }));

    const seedingResult = await seedUser(preparedUses);

    await Uploads.createCollection();

    return res.send(seedingResult);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
