const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

router.post('/', auth, likeCtrl.createLike);
router.get("/posts/:id", auth, likeCtrl.getLike); 
router.get("/:idPost/like/:id", auth, likeCtrl.isLiked); 

module.exports = router;