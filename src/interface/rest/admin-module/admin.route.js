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
const { login } = require('./admin.validation');
//const Auth = require('../../../infra/utils/auth');
const AsyncHandler = require('../../../infra/utils/asyncHandler');
const ResponseHandler = require('../../../infra/utils/responseHandler');
const { Admin } = require('../../../domain');
const { ERROR_TYPES } = require('../../../../constants')

/**
 * @api {post} /admin/login Admin [Post]
 * @apiGroup ADMIN
 * @apiDescription This api is used for admin login.
 * @apiParam {String} email Registered email of the admin.
 * @apiParam {String} password Password.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": "true",
 *        "message": "Success",
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
router.route('/admin/login').post(
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

//  eslint-disable-next-line no-unused-vars
router.use(function (err, req, res, next) {
  // specific for validation errors
  if (err instanceof ValidationError) {
    const response = {};
    response.success = false;
    response.statusCode = 400;
    response.message = err.details.body[0].message;
	response.type = ERROR_TYPES.TYPES.VALIDATION_ERROR;
    return ResponseHandler(res, response);
  }

  // other type of errors, it *might* also be a Runtime Error
  return res.status(500).send(err.stack);
});

module.exports = router;
