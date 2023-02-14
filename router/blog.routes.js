const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const BlogController = require('../controllers/blog.controller');
const upload = require('../middleware/upload');

router.get('/get/:url', BlogController.get);
router.post('/create', auth, upload.single('banner'), BlogController.create);

module.exports = router;