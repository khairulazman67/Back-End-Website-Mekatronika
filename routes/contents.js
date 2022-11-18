var express = require('express');
var router = express.Router();
const contentsCtrl = require('../controllers/contentsController');
const verifyToken = require('../middlewares/verifyToken');

const contents = new contentsCtrl()

router.post('/', contents.createdContens);
router.put('/:id', contents.updateContents);
router.get('/',contents.getContents);
router.get('/:id',contents.getContent);

module.exports = router;
