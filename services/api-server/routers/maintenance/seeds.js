const router = require('express').Router();

const { seedCase, getAllCasesIds } = require('../../models/case');
const { seedUser } = require('../../models/user');
const { users, cases } = require('../../models/seeds.json');

router.get('/', async (req, res, next) => {
  try {
    console.log('===== Seeding =====');
    await seedCase(cases);
    const caseIds = await getAllCasesIds();
    
    const preparedUses = users.map(user => ({
      ...user,
      cases: caseIds, 
    }))

    const seedingResult = await seedUser(preparedUses);

    return res.send(seedingResult);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
