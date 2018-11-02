'use strict';

const express = require('express');
const path = require('path');

const {
    addId,
    parseBuffer,
} = require('../repositories/common');

const File = require('../repositories/file');
const Mongo = require('../repositories/mongo');

const router = express.Router();

const { log } = console;

const filePath = path.join(process.cwd(), 'data', 'users.json');

// Not sure what to use instead of sampleError
const sampleError = {
    type: 'ErrorType',
    message: 'Error occurred',
    messageCode: 1052 // Optional message code (numeric)
};

const usersFile = new File(filePath);
const userMongo = new Mongo();

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns the total number of users, the users, and details.
 *     tags:
 *       - Users (Modifies data/users.json)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.get('/', (req, res) => {
    usersFile.read()
        .then(parseBuffer)
        .then((users) => {
            const data = {
                users,
                total_count: users.length
            };

            res.status(200).json(data);
        })
        .catch((e) => {
            log('Route /users failed with error', e);
            res.status(500).json(sampleError);
        });
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get details of a user
 *     description: Returns details of a single user
 *     tags:
 *       - Users (Modifies data/users.json)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
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
router.get('/:id', (req, res) => {
    const { id } = req.params;

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
 *       - Users (Modifies data/users.json)
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Server Error
 */
router.post('/', (req, res) => {
    const { name, email } = req.body;

    // Normally I would check for malicious input here

    if (!name || !email) {
        res.status(500).json({
            message: 'Invalid name or email'
        });
    }

    usersFile.read()
        .then(parseBuffer)
        .then((users) => {
            users.unshift(addId({ name, email }))
            return JSON.stringify(users);
        })
        .then(users => usersFile.write(users))
        .then(() => {
            res.status(201).send('Created');
        })
        .catch(e => log(`Error: ${e}`));
});

module.exports = router;