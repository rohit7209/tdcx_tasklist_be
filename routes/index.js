const express = require('express');
const authenticateRequest = require('../middlewares/authenticateRequest');
const router = express.Router();

// root level routes
router.use('/', require('./authentication'));

// authenticated routes
router.use('/tasks', authenticateRequest, require('./tasks'));
router.use('/dashboard', authenticateRequest, require('./dashboard'));

// unauthenticated routes

module.exports = router;
