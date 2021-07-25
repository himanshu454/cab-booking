const bunyan = require('bunyan');
const config = require('../../../config');
const fs = require('fs');
const dir = './logs';

//Create logs dir if not exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const logger = bunyan.createLogger({
  name: config.SERVICE_NAME,
  streams: [
    {
      level: 'debug',
      stream: process.stdout,
    },
    {
      type: 'rotating-file',
      level: 'info',
      path: `logs/${config.SERVICE_NAME}-debug.log`,
      period: '1d', // daily rotation
      count: 10, // keep 10 back copies
    },
    {
      type: 'rotating-file',
      level: 'error',
      path: `logs/${config.SERVICE_NAME}-error.log`,
      period: '1d', // daily rotation
      count: 10, // keep 10 back copies
    },
  ],
});

module.exports = logger;
