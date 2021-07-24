const { Rider } = require('../../infra/database/models');
const ErrorHandler = require('../../infra/utils/errorHandler');
const Encryption = require('../../infra/utils/encryption');
const {
  RESPONSE_MESSAGES,
  ERROR_TYPES,
  HTTP_STATUS_CODES,
} = require('../../../constants');

/**
 * Function for admin login.
 * @param {*} email
 * @param {*} password
 */

async function login({ email, password }) {
  //Check if this email already exist
  const rider = await Rider.findOne({ email });
  if (!rider) {
    return ErrorHandler.throwError({
      message: RESPONSE_MESSAGES.MESSAGES.RIDER_NOT_FOUND,
      code: HTTP_STATUS_CODES.CODES.DATA_NOT_FOUND,
      type: ERROR_TYPES.TYPES.DATA_NOT_FOUND,
    });
  }
  // Compare Password
  const isCorrect = rider.comparePassword(password);
  if (!isCorrect) {
    return ErrorHandler.throwError({
      message: RESPONSE_MESSAGES.MESSAGES.WRONG_PASSWORD,
      code: HTTP_STATUS_CODES.CODES.UNAUTHORIZED,
      type: ERROR_TYPES.TYPES.UNAUTHORIZED,
    });
  }
  // Sign Token
  let token = await Encryption.signToken(rider.safeObject());
  return { token, rider: rider.safeObject() };
}

module.exports = login;
