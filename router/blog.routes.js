const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const BlogController = require('../controllers/blog.controller');
const upload = require('../middleware/upload');

router.get('/', BlogController.list);
router.get('/get/:url', BlogController.get);
router.get('/search', BlogController.search);
router.post('/create', auth, upload.single('banner'), BlogController.create);
router.delete('/delete', auth, BlogController.delete);

module.exports = router;