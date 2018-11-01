'use strict';

const express = require('express');
const sampleRepo = require('../repositories/SampleRepository');

const router = express.Router();

/**
 * @swagger
 * /sample:
 *   get:
 *     summary: Sample Object
 *     description: Returns a sample object
 *     tags:
 *       - Sample
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.get('/', (req, res) => {
    try {
        let response = sampleRepo.getSampleObject();

        res.status(200).json(response);
    } catch (e) {
        console.log('Route /sample failed with error', e);

        res.status(500)
            .json({
                message: 'An error occurred calling sampleRepo.getSampleObject()'
            });
    }
});

const sampleError = {
    type: 'ErrorType',
    message: 'Error occurred',
    messageCode: 1052 // Optional message code (numeric)
};

/**
 * @swagger
 * /sample/posts:
 *   get:
 *     summary: Get all sample posts
 *     description: Returns all posts with details
 *     tags:
 *       - Posts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.get('/posts', (req, res) => {
    try {
        // I really like the way you assigned the promise to a variable.
        // Looks much cleaner.
        let promise = sampleRepo.getAllPosts();

        promise.then(data => {
            res.status(200).send(data);
        });

        promise.catch(error => {
            console.log('Failed', error);
            res.status(500).json(sampleError);
        });
    } catch (e) {
        console.log('Route /sample/posts/ failed with error', e);
        res.status(500).json(sampleError);
    }
});

/**
 * @swagger
 * /sample/posts/{postId}:
 *   get:
 *     summary: Get details of a post
 *     description: Returns details of a single post
 *     tags:
 *       - Posts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: postId
 *         description: ID of the post to fetch
 *         in: path
 *         required: true
 *         type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Successful
 *       500:
 *         description: Server Error
 */
router.get('/posts/:postId', (req, res) => {
    try {
        let postId = req.params.postId;
        let promise = sampleRepo.getPost(postId);

        promise.then(data => {
            // Do something (if required) with the data, then send it to the client
            res.status(200).send(data);
        });

        promise.catch(error => {
            // Never send stack traces to the client.
            console.log('/sample/posts/' + postId + ' failed with error', error);
            res.status(500).json(sampleError);
        });

    } catch (e) {
        // Use a good logging framework for logging to file
        res.status(500).json(sampleError);
    }
});

module.exports = router;
