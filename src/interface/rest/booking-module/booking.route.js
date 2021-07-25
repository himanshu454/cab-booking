'use strict';

/*
 * This file contails all the routes that are related to
 * admin.
 */
/*************Modules ***********/
const express = require('express');
const router = express.Router();
const { validate } = require('express-validation');

/****************Import Files****************/
const {
  nearByCabs,
  bookingRequest,
  getBookings,
} = require('./booking.validation');
const Auth = require('../../../infra/utils/auth');
const AsyncHandler = require('../../../infra/utils/asyncHandler');
const ResponseHandler = require('../../../infra/utils/responseHandler');
const { Booking } = require('../../../domain');

/**
 * @api {get} /rider/nearByCabs GetNearBy Cabs [Get]
 * @apiGroup BOOKING
 * @apiDescription This api is used for getting nearBy cabs.
 * @apiHeader {String} authorization Bearer Token
 * @apiParam {Number} longitude  Longitude if location.
 * @apiParam {Number} latitude Latitude of location.
 * @apiParam {Number} pageNo pageNo
 * @apiParam {Number} pageSize pageSize
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "data": { Object }
 *     } 
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *     }
 */

router.route('/nearByCabs').get(
  validate(nearByCabs),
  AsyncHandler(Auth.userAuth),
  AsyncHandler(async (req, res) => {
    console.log(req.query);
    // send only the data that is required by the controller
    try {
      const cabs = await Booking.getNearByCabs({
        longitude: req.query.longitude,
        latitude: req.query.latitude,
        pageNo: req.query.pageNo || 1,
        pageSize: req.query.pageSize || 10,
      });
      const response = {};
      response.success = true;
      response.statusCode = 200;
      response.data = cabs;
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
 * @api {post} /rider/requestBooking Request Booking [Post]
 * @apiGroup BOOKING
 * @apiDescription This api is used for request a booking.
 * @apiHeader {String} authorization Bearer Token
 * @apiParam {String} cabId Cab Id
 * @apiParam {Object} startLocation StartLocation address and location(longitude and latitude)
 * @apiParam {Object} endLocation EndLocation address and location(longitude and latitude)
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "data": { Object }
 *     } 
 * @apiErrorExample Error-Response 404:
 *     HTTP/1.1 404 Cab Not Found.
 *     {
 *       "success": "false",
 *       "message": "Cab Not Found!!",
 *     }
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *     }
 */

router.route('/requestBooking').post(
  validate(bookingRequest),
  AsyncHandler(Auth.userAuth),
  AsyncHandler(async (req, res) => {
    // send only the data that is required by the controller
    try {
      const cabId = req.body.cabId;
      let riderId = req.authUser._id;
      const booking = await Booking.bookingRequest(riderId, cabId, req.body);
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

/**
 * @api {get} /rider/bookings Get Past Bookings [Get]
 * @apiGroup BOOKING
 * @apiDescription This api is used for getting past bookings.
 * @apiHeader {String} authorization Bearer Token
 * @apiParam {Number} pageNo pageNo
 * @apiParam {Number} pageSize pageSize
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "data": { Object }
 *     } 
 * @apiErrorExample Error-Response 404:
 *     HTTP/1.1 404 Cab Not Found.
 *     {
 *       "success": "false",
 *       "message": "Cab Not Found!!",
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
  AsyncHandler(Auth.userAuth),
  AsyncHandler(async (req, res) => {
	  console.log(req.query)
    // send only the data that is required by the controller
    try {
      let riderId = req.authUser._id;
      const bookings = await Booking.getBookings(riderId, {
        pageNo: req.query.pageNo || 1,
        pageSize: req.query.pageSize || 10,
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

module.exports = router;
