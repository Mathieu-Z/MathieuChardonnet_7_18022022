const express = require('express');
const router = express.Router();
const max = require("../middleware/limit")

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', max.limiter, userCtrl.login);
router.get('/logout', userCtrl.logout)
router.delete('/deleteUser', userCtrl.deleteAccount);
router.put('/passwordChange', userCtrl.modifyPassword);
router.put('/modifyPseudo',userCtrl.modifyPseudo);

module.exports = router;