'use strict';

const express = require('express');
const path = require('path');

const {
    addId,
    parseBuffer,
} = require('../repositories/common');

const File = require('../repositories/file');
const Mongo = require('../repositories/file');

const router = express.Router();

const { log } = console;

const filePath = path.join(process.cwd(), '..', 'data', 'users.json');

// Not sure what to use instead of sampleError
const sampleError = {
    type: 'ErrorType',
    message: 'Error occurred',
    messageCode: 1052 // Optional message code (numeric)
};

const usersFile = new File(filePath);
// const userMongo = new Mongo(db);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns the total number of users, the users, and details.
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.get('/users', (req, res) => {
    log('/users hit (get)');

    usersFile.read()
        .then(parseBuffer)
        .then((users) => {
            const data = {
                users,
                total_count: users.length
            };

            res.status(200).json(JSON.stringify(data));
        })
        .catch((e) => {
            log('Route /users failed with error', e);
            res.status(500).json(sampleError);
        });
});

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get details of a user
 *     description: Returns details of a single user
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: uuid of the user to fetch
 *         in: path
 *         required: true
 *         type: string
 *         example: "565a82da-6584-442d-b30c-66729a9a230f"
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.get('/users/:userId', (req, res) => {
    log('/users/:userId hit (get)');

    const { userId } = req.params;

    usersFile.read()
        .then(parseBuffer)
        .then((users) => {
            const user = users.filter(user => user.uuid === id)
            res.status(200).json(user);
        })
        .catch((e) => {
            log('Route /users/:userId failed with error', e);
            res.status(500).json(sampleError);
        });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user and provides the user with a randomly generated uuid
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.post('/users', (req, res) => {
    log('/users hit (post)');

    if (!name || !email) {
        res.status(500).json({
            message: 'Invalid name or email'
        });
    }

    // Normally I would check for malicious input here

    const { name, email} = req.body;

    usersFile.read()
        .then(parseBuffer)
        .then((users) => {
            users.unshift(addId({ name, email }))
            return JSON.stringify(users);
        })
        .then(users => usersFile.write(users))
        .catch(e => log(`Error: ${e}`));
});

module.exports = router;
