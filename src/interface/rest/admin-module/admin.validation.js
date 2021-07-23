'use strict';

/*
 * This file contains code for validation of request params
 */

const { Joi } = require('express-validation');
const { CAB } = require('../../../../constants');
const cabType = CAB.CAB_TYPE;

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
    name: Joi.string().required().description('Driver Name'),
    email: Joi.string().required().description('Driver Email'),
    phoneNumber: Joi.string().required().description('Driver Phone Number'),
  }).unknown(),
};

const registerCab = {
  headers: Joi.object({
    authorization: Joi.string().required().description('Jwt Token'),
  }).unknown(),
  body: Joi.object({
    driverId: Joi.string().required().description('Driver Id'),
    registrationNo: Joi.string()
      .required()
      .description('Registration number of cab'),
    brand: Joi.string().required().description('car brand'),
    model: Joi.string().required().description('car model'),
    location: Joi.object({
      type: Joi.string().valid('Point').description('Type of location'),
      coordinates: Joi.array()
        .items(Joi.number())
        .min(2)
        .max(2)
        .description('Coordinates of location.'),
    }),
    type: Joi.string()
      .valid(cabType.MOTOR_BIKE, cabType.CAR)
      .description('Type of cab'),
  }).unknown(),
};

module.exports = {
  login,
  registerDriver,
  registerCab,
};
