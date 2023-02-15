const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CommentController = require('../controllers/comment.controller');

router.post('/create', CommentController.create);
router.delete('/delete', CommentController.delete);

module.exports = router;