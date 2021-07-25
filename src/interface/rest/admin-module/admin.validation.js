'use strict';

/*
 * This file contains code for validation of request params
 */

const { Joi } = require('express-validation');
const { CAB, BOOKING } = require('../../../../constants');
const CabType = CAB.CAB_TYPE;
const BookingStatus = BOOKING.BOOKING_STATUS;

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
      .valid(CabType.MOTOR_BIKE, CabType.CAR)
      .description('Type of cab'),
  }).unknown(),
};

const getBookings = {
  headers: Joi.object({
    authorization: Joi.string().required().description('Jwt Token'),
  }).unknown(),
  query: Joi.object({
    status: Joi.string()
      .valid(
        BookingStatus.REQUESTED,
        BookingStatus.COMPLETED,
        BookingStatus.CONFIRMED,
        BookingStatus.CANCELLED,
      )
      .description('Booking Status'),
    pageNo: Joi.number().optional().description('page no.'),
    pageSize: Joi.number().optional().description('Documents Limit per page'),
  }).unknown(),
};

const updateBookingStatus = {
  headers: Joi.object({
    authorization: Joi.string().required().description('Jwt Token'),
  }).unknown(),
  body: Joi.object({
    bookingId: Joi.string().required().description('Booking Id'),
    status: Joi.string()
      .valid(
        BookingStatus.COMPLETED,
        BookingStatus.CONFIRMED,
        BookingStatus.CANCELLED,
      )
      .description('Booking Status'),
  }).unknown(),
};

module.exports = {
  login,
  registerDriver,
  registerCab,
  getBookings,
  updateBookingStatus,
};
