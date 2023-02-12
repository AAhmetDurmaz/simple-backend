const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blog.controller');

router.post('/create', BlogController.create);

module.exports = router;