'use strict';

const express = require('express');

const usersRoutes = require('./users');
const swaggerRoutes = require('./swagger');

const router = express.Router();

router.use('/docs', swaggerRoutes);
router.use('/users', usersRoutes);

module.exports = router;
