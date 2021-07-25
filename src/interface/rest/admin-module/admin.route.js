'use strict';

/*
 * This file contails all the routes that are related to
 * admin.
 */
/*************Modules ***********/
const express = require('express');
const router = express.Router();
const { validate, ValidationError } = require('express-validation');

/****************Import Files****************/
const {
  login,
  registerDriver,
  registerCab,
  getBookings,
  updateBookingStatus,
} = require('./admin.validation');
//const Auth = require('../../../infra/utils/auth');
const AsyncHandler = require('../../../infra/utils/asyncHandler');
const ResponseHandler = require('../../../infra/utils/responseHandler');
const { Admin } = require('../../../domain');
const { ERROR_TYPES, RESPONSE_MESSAGES } = require('../../../../constants');

/**
 * @api {post} /admin/login AdminLogin [Post]
 * @apiGroup ADMIN
 * @apiDescription This api is used for admin login.
 * @apiParam {String} email Registered email of the admin.
 * @apiParam {String} password Password.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "data": {
 *            "token": "JWT",
 *            "admin": {
 *               "_id": "String",
 *               "email": "String"
 *             }
 *         },
 *     }
 *
 * @apiErrorExample Error-Response 401:
 *     HTTP/1.1 401 Unauthorized.
 *     {
 *       "success": "false",
 *       "message": "Wrong Password!",
 *     }
 *
 * @apiErrorExample Error-Response 404:
 *     HTTP/1.1 404 Data not found.
 *     {
 *       "success": "false",
 *       "message": "Admin not found!",
 *     }
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *     }
 */
router.route('/login').post(
  validate(login),
  AsyncHandler(async (req, res) => {
    console.log(req.body);
    // send only the data that is required by the controller
    try {
      const admin = await Admin.login({
        email: req.body.email,
        password: req.body.password,
      });
      const response = {};
      response.success = true;
      response.statusCode = 200;
      response.data = admin;
      return ResponseHandler(res, response);
    } catch (e) {
      console.log(e);
      const response = {};
      response.success = false;
      response.statusCode = e.code;
      response.message = e.message;
      return ResponseHandler(res, response);
    }
  }),
);

/**
 * @api {post} /admin/register/driver RegisterDriver [Post]
 * @apiGroup ADMIN
 * @apiDescription This api is used to register a driver.
 * @apiHeader {String} authorization Bearer Token.
 * @apiParam {String} email email of the driver.
 * @apiParam {String} name name of the driver.
 * @apiParam {String} password Password.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "data": {Object},
 *     }
 *
 * @apiErrorExample Error-Response 400:
 *     HTTP/1.1 400 Bad Request.
 *     {
 *       "success": "false",
 *       "message": "Driver Already exist with this email!!",
 *     }
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *     }
 */

router.route('/register/driver').post(
  validate(registerDriver),
  AsyncHandler(async (req, res) => {
    console.log(req.body);
    // send only the data that is required by the controller
    try {
      const driver = await Admin.registerDriver({
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
      });
      const response = {};
      response.success = true;
      response.statusCode = 200;
      response.data = driver;
      return ResponseHandler(res, response);
    } catch (e) {
      console.log(e);
      const response = {};
      response.success = false;
      response.statusCode = e.code;
      response.message = e.message;
      return ResponseHandler(res, response);
    }
  }),
);

/**
 * @api {post} /admin/register/cab RegisterCab [Post]
 * @apiGroup ADMIN
 * @apiDescription This api is used to register a cab.
 * @apiHeader {String} authorization Bearer Token
 * @apiParam {String} driverId Id of the driver.
 * @apiParam {String} registrationNo Registration Number of cab.
 * @apiParam {String} brand Brand of cab.
 * @apiParam {String} model Model of cab.
 * @apiParam {String} location Password.
 * @apiParam {String} type Cab Type('MOTOTBIKE', 'CAR').
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "data": {Object},
 *     }
 *
 * @apiErrorExample Error-Response 400:
 *     HTTP/1.1 400 Bad Request.
 *     {
 *       "success": "false",
 *       "message": "Driver Already exist with this email!!",
 *     }
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *     }
 */

router.route('/register/cab').post(
  validate(registerCab),
  AsyncHandler(async (req, res) => {
    console.log(req.body);
    // send only the data that is required by the controller
    try {
      const driverId = req.body.driverId;
      const cab = await Admin.registerCab(driverId, {
        registrationNo: req.body.registrationNo,
        brand: req.body.brand,
        model: req.body.model,
        location: req.body.location,
        type: req.body.type,
      });
      const response = {};
      response.success = true;
      response.statusCode = 200;
      response.data = cab;
      return ResponseHandler(res, response);
    } catch (e) {
      console.log(e);
      const response = {};
      response.success = false;
      response.statusCode = e.code;
      response.message = e.message;
      return ResponseHandler(res, response);
    }
  }),
);

/**
 * @api {get} /admin/bookings RiderBookings [Get]
 * @apiGroup ADMIN
 * @apiDescription This api is used to get all the bookings of the riders.
 * @apiHeader {String} authorization Bearer Token
 * @apiParam {String} status Pass status of booking(CONFIRMED, REQUESTED, CANCELLED, COMPLETED).
 * @apiParam {String} pageNo Page Number.
 * @apiParam {String} pageSize Page Size.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "data": {Object},
 *     }
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *     }
 */

router.route('/bookings').get(
  validate(getBookings),
  AsyncHandler(async (req, res) => {
    console.log(req.body);
    // send only the data that is required by the controller
    try {
      const bookings = await Admin.getBookings({
        status: req.query.status,
        pageNo: req.query.pageNo,
        pageSize: req.query.pageSize,
      });
      const response = {};
      response.success = true;
      response.statusCode = 200;
      response.data = bookings;
      return ResponseHandler(res, response);
    } catch (e) {
      console.log(e);
      const response = {};
      response.success = false;
      response.statusCode = e.code;
      response.message = e.message;
      return ResponseHandler(res, response);
    }
  }),
);

/**
 * @api {put} /admin/bookingStatus ConfirmBooking/UpdateBookingStatus [Put]
 * @apiGroup ADMIN
 * @apiDescription This api is used to confirm booking.
 * @apiHeader {String} authorization Bearer Token
 * @apiParam {String} bookingId Booking Id.
 * @apiParam {String} status Pass status of booking(CONFIRMED, CANCELLED, COMPLETED).
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "data": {Object},
 *     }
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *     }
 */

router.route('/bookingStatus').put(
  validate(updateBookingStatus),
  AsyncHandler(async (req, res) => {
    console.log(req.body);
    // send only the data that is required by the controller
    try {
      const booking = await Admin.bookingStatus({
        status: req.body.status,
        bookingId: req.body.bookingId,
      });
      const response = {};
      response.success = true;
      response.statusCode = 200;
      response.data = booking;
      return ResponseHandler(res, response);
    } catch (e) {
      console.log(e);
      const response = {};
      response.success = false;
      response.statusCode = e.code;
      response.message = e.message;
      return ResponseHandler(res, response);
    }
  }),
);

/**************************************************
 *********** Validation Middleware Function *******
 **************************************************/

//  eslint-disable-next-line no-unused-vars
router.use(function (err, req, res, next) {
  // specific for validation errors
  if (err instanceof ValidationError) {
    const response = {};
    response.success = false;
    response.statusCode = 400;
    // If body validation error
    if (err.details.body && err.details.body.length > 0) {
      response.message = err.details.body[0].message;
    } // if header validation error
    else if (err.details.headers && err.details.headers.length > 0) {
      response.message = err.details.headers[0].message;
    } else {
      response.message = RESPONSE_MESSAGES.MESSAGES.VALIDATION_ERROR;
    }
    response.type = ERROR_TYPES.TYPES.VALIDATION_ERROR;
    return ResponseHandler(res, response);
  }

  // other type of errors, it *might* also be a Runtime Error
  return res.status(500).send(err.stack);
});

module.exports = router;
