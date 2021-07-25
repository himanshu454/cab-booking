const { Driver } = require('../../infra/database/models');
const ErrorHandler = require('../../infra/utils/errorHandler');
const {
  RESPONSE_MESSAGES,
  ERROR_TYPES,
  HTTP_STATUS_CODES,
} = require('../../../constants');

/**
 * Function to register Driver.
 * @param {*} name
 * @param {*} email
 * @param {*} phoneNumber
 */

async function registerDriver({ name, email, phoneNumber }) {
  //Check if driver already exist with this email
  const driver = await Driver.findOne({ email });
  if (driver) {
    return ErrorHandler.throwError({
      message: RESPONSE_MESSAGES.MESSAGES.DRIVER_ALREADY_EXIST_WITH_THIS_EMAIL,
      code: HTTP_STATUS_CODES.CODES.BAD_REQUEST,
      type: ERROR_TYPES.TYPES.BAD_REQUEST,
    });
  }
  const driverObject = {
    name,
    email,
    phoneNumber,
  };
  // Save Driver
  const driverDetail = new Driver(driverObject);
  await driverDetail.save();
  return driverDetail.safeObject();
}

module.exports = registerDriver;
