'use strict';

const express = require('express');

const user = require('../stuff/user');

const router = express.Router();

const { log } = console;

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
    log('/users hit');

    try {
        user.getAll();
    } catch (e) {
        log('Route /users failed with error', e);
        res.status(500).json(sampleError);
    }
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
    console.log('HEY');
    try {
        const userId = req.params.userId;

        log('/users/:userId hit');

        log({userId});

        user.get(userId);

        // .then(data => {
        //     // Do something (if required) with the data, then send it to the client
        //     res.status(200).send(data);
        // })
        // .catch(error => {
        //     // Never send stack traces to the client.
        //     console.log(`/users/${userId} failed with error, ${error}`);
        //     res.status(500).json(sampleError);
        // });

    } catch (e) {
        // Use a good logging framework for logging to file
        res.status(500).json(sampleError);
    }
});

// Was unsure what to put for 'produces' in the
// Swagger annotation below, so I deleted it...

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
    console.log('HEY');

    const { name, email} = req.body;

    log('post - /users hit');

    // Normally I would check for malicious input here
    
    if (!name || !email) {
        res.status(500).json({
            message: 'Invalid name or email'
        });
    }

    try {
        const response = user.create({ email, name });

        res.status(200).json(response);
    } catch (e) {
        log('Route /users failed with error', e);

        res.status(500)
            .json({
                message: 'An error occurred calling user.create()'
            });
    }
});

module.exports = router;
