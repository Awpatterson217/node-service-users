'use strict';

const express = require('express');

const usersRoutes = require('./usersFile');
const usersMRoutes = require('./usersMongo');
const swaggerRoutes = require('./swagger');

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/usersM', usersMRoutes);
router.use('/docs', swaggerRoutes);

module.exports = router;
