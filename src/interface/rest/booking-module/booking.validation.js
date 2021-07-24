'use strict';

/*
 * This file contains code for validation of request params
 */

const { Joi } = require('express-validation');

// Request Booking Payload
const bookingRequest = {
  headers: Joi.object({
    authorization: Joi.string().required().description('Jwt Token'),
  }).unknown(),
  body: Joi.object({
    cabId: Joi.string().required().description('Cab Id'),
    startLocation: Joi.object({
      location: Joi.object({
        longitude: Joi.number()
          .required()
          .description('longitude of start location'),
        latitude: Joi.number()
          .required()
          .description('latitude of start location'),
      }).unknown(),
      address: Joi.object({
        street: Joi.string().required().description('Start location Address'),
        city: Joi.string().required().description('Start location City'),
        state: Joi.string().required().description('Start location State'),
        country: Joi.string().required().description('Country'),
        zipCode: Joi.string().required().description('Start location ZipCode'),
      }).unknown(),
    }),
    endLocation: Joi.object({
      location: Joi.object({
        longitude: Joi.number()
          .required()
          .description('longitude of end location'),
        latitude: Joi.number()
          .required()
          .description('latitude of end location'),
      }).unknown(),
      address: Joi.object({
        street: Joi.string().required().description('End location Address'),
        city: Joi.string().required().description('End location City'),
        state: Joi.string().required().description('End location State'),
        country: Joi.string().required().description('Country'),
        zipCode: Joi.string().required().description('End location ZipCode'),
      }).unknown(),
    }),
  }).unknown(),
};

// Nearestcabs query validations
const nearByCabs = {
  headers: Joi.object({
    authorization: Joi.string().required().description('Jwt Token'),
  }).unknown(),
  query: Joi.object({
    longitude: Joi.number()
      .required()
      .description('longitude of rider location'),
    latitude: Joi.number().required().description('latitude of rider location'),
    pageNo: Joi.number().optional().description('page no.'),
    pageSize: Joi.number().optional().description('Documents Limit per page'),
  }).unknown(),
};

const getBookings = {
  headers: Joi.object({
    authorization: Joi.string().required().description('Jwt Token'),
  }).unknown(),
  query: Joi.object({
    pageNo: Joi.number().optional().description('page no.'),
    pageSize: Joi.number().optional().description('Documents Limit per page'),
  }).unknown(),
};

module.exports = {
  bookingRequest,
  nearByCabs,
  getBookings,
};
