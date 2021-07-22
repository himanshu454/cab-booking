'use strict';

/*
 * This file contains code for validation of request params
 */

const { Joi } = require('express-validation');

const login = {
  body: Joi.object({
    email: Joi.string().required().description('Admin Email'),
    password: Joi.string().required().description('Admin Password'),
  }).unknown(),
};

const registerDriver = {
  headers: Joi.object({
    authorization: Joi.string().required().description('Jwt Token'),
  }).unknown(),
  body: Joi.object({
    email: Joi.string().required().description('Admin Email'),
    password: Joi.string().required().description('Admin Password'),
  }).unknown(),
};

module.exports = {
  login,
  registerDriver,
};
