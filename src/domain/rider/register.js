const { Rider } = require('../../infra/database/models');
const ErrorHandler = require('../../infra/utils/errorHandler');
const {
  RESPONSE_MESSAGES,
  ERROR_TYPES,
  HTTP_STATUS_CODES,
} = require('../../../constants');

/**
 * Function to register Rider/User.
 * @param {*} name
 * @param {*} email
 * @param {*} phoneNumber
 * @param {*} password
 * @param {*} country
 */

async function register({ name, email, password, phoneNumber, country }) {
  //Check if rider already exist with this email
  const rider = await Rider.findOne({ email });
  if (rider) {
    return ErrorHandler.throwError({
      message: RESPONSE_MESSAGES.MESSAGES.RIDER_ALREADY_EXIST_WITH_THIS_EMAIL,
      code: HTTP_STATUS_CODES.CODES.BAD_REQUEST,
      type: ERROR_TYPES.TYPES.BAD_REQUEST,
    });
  }
  const riderObject = {
    name,
    email,
    password,
    phoneNumber,
    country,
  };
  // Save Driver
  const riderDetail = new Rider(riderObject);
  await riderDetail.save();
  return riderDetail.safeObject();
}

module.exports = register;
