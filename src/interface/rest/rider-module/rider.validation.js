'use strict';

/*
 * This file contains code for validation of request params
 */

const { Joi } = require('express-validation');

const register = {
  body: Joi.object({
    name: Joi.string().required().description('Rider/User Name'),
    email: Joi.string().required().description('Rider/User Email'),
    phoneNumber: Joi.string().required().description('Rider/User Phone Number'),
    password: Joi.string()
      .min(6)
      .required()
      .description('Rider/User login password'),
    country: Joi.string().required().description('Rider/User country'),
  }).unknown(),
};

const login = {
  body: Joi.object({
    email: Joi.string().required().description('Rider/User Email'),
    password: Joi.string().required().description('Rider/User Password'),
  }).unknown(),
};

module.exports = {
  register,
  login,
};
