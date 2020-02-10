const router = require('express').Router();
const { cases } = require('../../controllers');

router.get('/', cases.list);
router.post('/', cases.create);
router.put('/', cases.update);
router.delete('/', cases.remove);

module.exports = router;
