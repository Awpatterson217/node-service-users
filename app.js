'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes/index');

console.log('Service: Starting');

/**
 * Initialize Express app
 *
 * @type {Function}
 */
const app = express();

/**
 * Middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/**
 * Default Service Route(s)
 */
app.use('/', routes);

/**
 * Swagger UI Docs Route
 */
app.use('/docs', express.static(path.join(__dirname, 'public/swagger-ui')));

/**
 * Catch all 404 Route
 */
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
            .json({
                message: err.message,
                error: err
            });
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            message: err.message,
            error: {}
        });
});

/**
 * Start service by listening on a port.
 */
app.listen(process.env.PORT || 3000, () => {
    console.log('Service: Started');
});

module.exports = app;
