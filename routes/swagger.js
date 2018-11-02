'use strict';

const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');

const router = express.Router();

/**
 * Swagger Default Configuration
 */
const options = {
    swaggerDefinition: {
        info: {
            title: 'Apollidon Node.js Users Microservice',
            description: 'A project modified by a [hopeful] future Apollidon developer.',
            version: '0.0.1'
        },
        schemes: [
            'http',
            'https'
        ],
        basePath: '/'
    },
    apis: [
        'routes/usersFile.js',
        'routes/usersMongo.js',
    ],
};

/**
 * Expose swagger.json at /swagger.json
 */
router.get('/swagger.json', function(req, res) {
    res.json(swaggerJSDoc(options));
});

module.exports = router;