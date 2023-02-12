
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const OtherController = require('../controllers/other.controller');

router.get('/protected-route', auth, OtherController.protected_route);
router.get('/error-handler-test', auth, OtherController.error_handler_test);

module.exports = router;