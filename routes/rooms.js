var express = require('express');
var router = express.Router();
var room = require('../controllers/room');
/* GET rooms listing. */

router.all('/', room.list);
router.all('/:id/:op?', room.load);
router.get('/:id', room.view);
router.get('/:id/view', room.view);
//router.get('/:id/edit', room.edit);
router.put('/:id/update', room.update);

module.exports = router;

