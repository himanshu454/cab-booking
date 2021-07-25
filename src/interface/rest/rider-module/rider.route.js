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
const { register, login } = require('./rider.validation');
//const Auth = require('../../../infra/utils/auth');
const AsyncHandler = require('../../../infra/utils/asyncHandler');
const ResponseHandler = require('../../../infra/utils/responseHandler');
const { Rider } = require('../../../domain');

/**
 * @api {post} /rider/register RiderRegister [Post]
 * @apiGroup RIDER
 * @apiDescription This api is used for rider/user Registration.
 * @apiParam {String} email  email of the rider.
 * @apiParam {String} password Password.
 * @apiParam {String} name name of rider
 * @apiParam {String} country country of rider
 * @apiParam {String} phoneNumber phoneNumber of rider
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "data": {
 *            "token": "JWT",
 *            "rider": { Object }
 *         },
 *     }
 *
 * @apiErrorExample Error-Response 404:
 *     HTTP/1.1 400 Bad Request.
 *     {
 *       "success": "false",
 *       "message": "Please Use another email, already in use!",
 *     }
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *     }
 */

router.route('/register').post(
  validate(register),
  AsyncHandler(async (req, res) => {
    console.log(req.body);
    // send only the data that is required by the controller
    try {
      const rider = await Rider.register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        country: req.body.country,
      });
      const response = {};
      response.success = true;
      response.statusCode = 200;
      response.data = rider;
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
 * @api {post} /rider/login RiderLogin [Post]
 * @apiGroup RIDER
 * @apiDescription This api is used for rider/user login.
 * @apiParam {String} email  email of the rider.
 * @apiParam {String} password Password.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "data": {
 *            "token": "JWT",
 *            "rider": { Object }
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
 *       "message": "Rider not found!",
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
      const rider = await Rider.login({
        email: req.body.email,
        password: req.body.password,
      });
      const response = {};
      response.success = true;
      response.statusCode = 200;
      response.data = rider;
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
