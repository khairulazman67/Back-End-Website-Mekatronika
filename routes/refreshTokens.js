const express = require('express');
const router = express.Router();

const tokenCtrl = require('../controllers/refreshTokensController');
const token = new tokenCtrl()

router.post('/', token.create);
router.post('/refresh', token.refreshToken);
router.get('/', token.getToken);

module.exports = router;
