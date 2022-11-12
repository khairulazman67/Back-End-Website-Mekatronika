var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/userController');

const rpc = new userCtrl()

router.post('/register', rpc.register);
router.post('/login', rpc.login);
router.post('/logout', rpc.logout);
router.put('/:id', rpc.update);
router.get('/:id', rpc.getUser);
router.get('/', rpc.getUsers);

module.exports = router;
