'use strict';

/*
 * This file contails all the routes that are related to
 * auth of the user.
 */
const express = require('express');
const router = express.Router();
const { validate, ValidationError } = require('express-validation');
const validation = require('./webhook.validation');
const Auth = require('../../../infra/utils/auth');
const AsyncHandler = require('../../../infra/utils/asyncHandler');
const ResponseHandler = require('../../../infra/utils/responseHandler');
const { Event } = require('../../../domain');

/**
 * @api {post} /webhook Webhook [Post]
 * @apiGroup Webhook
 * @apiDescription This api is used by sync server to push events.
 * @apiHeader {String} x-access-token Server Access Token.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *        "success": "true",
 *        "message": "Success",
 *     }
 *
 * @apiErrorExample Error-Response 403:
 *     HTTP/1.1 403 Unable to push the event to server.
 *     {
 *       "success": "false",
 *       "message": "Unable to push event to the server",
 *     }
 *
 * @apiErrorExample Error-Response 500:
 *     HTTP/1.1 500 Error on server side.
 *     {
 *       "success": "false",
 *       "message": "Something went wrong",
 *     }
 */
router.route('/webhook').post(
  validate(validation.webhook, validation.strictChecking),
  AsyncHandler(Auth.webhookAuth),
  AsyncHandler(async (req, res) => {
    console.log(req.body);
    const event = await Event.save(req.body.companyId, req.body.locationId, {
      eventName: req.body.eventName,
      eventUuid: req.body.eventUuid,
      data: req.body.data,
    });
    // send only the data that is required by the controller
    const response = {};
    response.success = true;
    response.statusCode = 200;
    response.data = event;
    return ResponseHandler(res, response);
  }),
);

// eslint-disable-next-line no-unused-vars
router.use(function (err, req, res, next) {
  console.log(err.details);
  // specific for validation errors
  if (err instanceof ValidationError) {
    const response = {};
    response.success = false;
    response.statusCode = 400;
    response.message = 'Validation Error';
    return ResponseHandler(res, response);
  }

  // other type of errors, it *might* also be a Runtime Error
  return res.status(500).send(err.stack);
});

module.exports = router;
