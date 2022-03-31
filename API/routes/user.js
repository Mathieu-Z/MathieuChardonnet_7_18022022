const express = require('express');
const router = express.Router();
const max = require("../middleware/limit")

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', max.limiter, userCtrl.login);
router.get('/logout', userCtrl.logout)
router.delete('/account/delete', userCtrl.deleteAccount);
router.put('/password/change', userCtrl.modifyPassword);

module.exports = router;