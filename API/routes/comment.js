const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const commentCtrl = require('../controllers/comment');

router.get('/:id', auth, admin, commentCtrl.getAllRemarks);
router.delete('/:id', auth, admin, commentCtrl.deleteRemark);
router.post('/:id', auth, multer, commentCtrl.createRemark);

module.exports = router;

// creer route admin
