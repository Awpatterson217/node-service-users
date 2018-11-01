'use strict';

const express = require('express');

const usersRoutes = require('./users');
const swaggerRoutes = require('./swagger');

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/docs', swaggerRoutes);

module.exports = router;
