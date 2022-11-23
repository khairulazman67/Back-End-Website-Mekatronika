var express = require('express');
var router = express.Router();
const categoriesCtrl = require('../controllers/categoriesController');
const verifyToken = require('../middlewares/verifyToken');

const categories = new categoriesCtrl()

router.post('/', categories.createdCategories);
router.put('/:id', categories.updateCategories);
router.get('/', categories.getCategories);
router.delete('/:id',categories.deleteCategories);
module.exports = router;
