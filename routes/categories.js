var express = require('express');
var router = express.Router();
const categoriesCtrl = require('../controllers/categoriesController');
const verifyToken = require('../middlewares/verifyToken');

const categories = new categoriesCtrl()

router.post('/', categories.createdCategories);

module.exports = router;
