var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

const user = new userCtrl()

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', user.logout);
router.put('/:id', user.update);
router.get('/:id', verifyToken, user.getUser);
router.get('/', user.getUsers);

module.exports = router;
