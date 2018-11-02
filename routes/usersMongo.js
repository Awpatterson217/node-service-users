'use strict';

const express = require('express');

const router = express.Router();

const sampleError = {
    type: 'ErrorType',
    message: 'Error occurred',
    messageCode: 1052 // Optional message code (numeric)
};

const {
    addId,
} = require('../repositories/common');
const MongoDBCollection = require('../repositories/mongo');

const usersCollection = new MongoDBCollection('users');

const { log } = console;

/**
 * @swagger
 * /usersM:
 *   get:
 *     summary: Get all users
 *     description: Returns the total number of users, the users, and details.
 *     tags:
 *       - Users (MongoDB)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.get('/', (req, res) => {
    usersCollection.getAll((error, users) => {
        if (error) {
            log('Route /users failed with error', error);
            res.status(500).json(sampleError);
        }

        const data = {
            users,
            total_count: users.length
        };

        res.status(200).json(data);
    });
});

/**
 * @swagger
 * /usersM/{uuid}:
 *   get:
 *     summary: Get details of a user
 *     description: Returns details of a single user
 *     tags:
 *       - Users (MongoDB)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: uuid
 *         description: id of the user to fetch
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
router.get('/:uuid', (req, res) => {
    const { uuid } = req.params;

    usersCollection.get({ uuid }, (error, users) => {
        if (error) {
            log('Route /users:uuid failed with error', error);
            res.status(500).json(sampleError);
        }

        res.status(200).json(users);
    });
});

/**
 * @swagger
 * /usersM:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user and provides the user with a randomly generated uuid
 *     tags:
 *       - Users (MongoDB)
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

    usersCollection.insert(addId({ name, email }), (error, number) => {
        if (error) {
            log('Route /users:uuid failed with error', error);
            res.status(500).json(sampleError);
        }

        if (number) {
            res.status(201).send('Created');
        } else {
            res.status(500).json(sampleError);
        }
    });
});

module.exports = router;