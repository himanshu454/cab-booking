const { Admin } = require('../../infra/database/models');
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
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return ErrorHandler.throwError({
      message: RESPONSE_MESSAGES.MESSAGES.ADMIN_NOT_FOUND,
      code: HTTP_STATUS_CODES.CODES.DATA_NOT_FOUND,
      type: ERROR_TYPES.TYPES.DATA_NOT_FOUND,
    });
  }
  // Compare Password
  const isCorrect = admin.comparePassword(password);
  if (!isCorrect) {
    return ErrorHandler.throwError({
      message: RESPONSE_MESSAGES.MESSAGES.WRONG_PASSWORD,
      code: HTTP_STATUS_CODES.CODES.UNAUTHORIZED,
      type: ERROR_TYPES.TYPES.UNAUTHORIZED,
    });
  }
  // Sign Token
  let token = await Encryption.signToken(admin.safeObject());
  return { token, admin: admin.safeObject() };
}

module.exports = login;
