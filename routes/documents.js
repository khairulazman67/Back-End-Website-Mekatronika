var express = require('express');
var router = express.Router();
const documentsCtrl = require('../controllers/documentsController');
const verifyToken = require('../middlewares/verifyToken');

const documents = new documentsCtrl()

router.post('/', documents.createdDocuments);
router.put('/:id', documents.updateDocuments);

module.exports = router;
