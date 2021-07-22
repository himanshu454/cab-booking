'use strict';

/*
 * This file exports the app that is used by the server to expose the routes.
 * And make the routes visible.
 */

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const REST = require('./interface/rest');

// Express App
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// parse application/json
app.use(
  bodyParser.json({
    limit: '10mb',
    extended: true,
  }),
);

// Use default logger for now
app.use(logger('combined'));
app.use(cors());
app.use(helmet());

// This is to check if the service is online or not
app.use('/ping', function (req, res) {
  res.json({ reply: 'pong' });
  res.end();
});

// Mount the Routes
app.use('/v1', REST.routes);

// Documentation path
app.use('/documentation', express.static('docs'))

// Export the express app instance
module.exports = app;
