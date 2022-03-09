const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

router.get('/:id', auth, commentCtrl.getAllRemarks);
router.get('/:id', auth, commentCtrl.getOneRemark);
router.delete('/:id', auth, commentCtrl.deleteRemark);
router.post('/:id', auth, multer, commentCtrl.createRemark);

module.exports = router;