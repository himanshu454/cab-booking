'use strict';

/*
 * This file contains code for validation of request params
 */

const { Joi } = require('express-validation');

const strictChecking = {};

const webhook = {
  headers: Joi.object({
    'x-access-token': Joi.string().required(),
  }).unknown(),
  body: Joi.object({
    eventName: Joi.string().required(),
    companyId: Joi.string().required(),
    locationId: Joi.string().required(),
  }).unknown(),
};

module.exports = {
  webhook,
  strictChecking,
};
