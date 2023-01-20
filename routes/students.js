var express = require('express');
var router = express.Router();
const studentsCtrl = require('../controllers/studentsController');
const verifyToken = require('../middlewares/verifyToken');

const students = new studentsCtrl()

router.post('/', students.createdStudents);
router.put('/:NIM', students.updateStudents);
router.get('/',students.getStudents);
router.get('/:NIM',students.getStudent);
router.delete('/:NIM',students.deleteStudents);


module.exports = router;
