var express = require('express');
var router = express.Router();
const lecturessCtrl = require('../controllers/lecturesController');
const verifyToken = require('../middlewares/verifyToken');

const lectures = new lecturessCtrl()

router.post('/', lectures.createdLectures);
// router.put('/:id', lectures.updatelectures);
router.get('/',lectures.getLectures);
// router.get('/:id',lectures.getDocument);
router.delete('/:id',lectures.deleteLectures);

module.exports = router;
