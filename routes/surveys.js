var express = require('express');
var router = express.Router();
const surveysCtrl = require('../controllers/surveysController');
const verifyToken = require('../middlewares/verifyToken');

const surveys = new surveysCtrl()

router.post('/', surveys.createdSurveys);
router.put('/:id', surveys.updateSurveys);
router.get('/',surveys.getSurveys);
router.get('/:id',surveys.getDocument);
router.delete('/:id',surveys.deleteSurveys);

module.exports = router;
