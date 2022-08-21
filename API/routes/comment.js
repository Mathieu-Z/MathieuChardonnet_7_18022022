const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const commentCtrl = require('../controllers/comment');

router.get('/:postId', auth, commentCtrl.getAllRemarks);
router.post('/', auth, commentCtrl.createRemark);
router.delete('/:id', auth, commentCtrl.deleteRemark);
router.delete('/admin/:id', auth, admin, commentCtrl.deleteRemark);

module.exports = router;