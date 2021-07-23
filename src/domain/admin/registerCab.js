const { Cab, Driver } = require('../../infra/database/models');
const ErrorHandler = require('../../infra/utils/errorHandler');
const {
  RESPONSE_MESSAGES,
  ERROR_TYPES,
  HTTP_STATUS_CODES,
} = require('../../../constants');

/**
 * Function to register Cab.
 * @param {*} registrationNo
 * @param {*} brand
 * @param {*} model
 * @param {*} location //Object
 * @param {*} type
 */

async function registerCab(
  driverId,
  { registrationNo, brand, model, location, type },
) {
  // check if driver exist
  const driver = await Driver.findOne({ _id: driverId });
  if (!driver) {
    return ErrorHandler.throwError({
      message: RESPONSE_MESSAGES.MESSAGES.DRIVER_NOT_FOUND,
      code: HTTP_STATUS_CODES.CODES.DATA_NOT_FOUND,
      type: ERROR_TYPES.TYPES.DATA_NOT_FOUND,
    });
  }
  //Check if cab is already registered
  const cab = await Cab.findOne({
    registrationNo: registrationNo.toUpperCase(),
  });
  if (cab) {
    return ErrorHandler.throwError({
      message:
        RESPONSE_MESSAGES.MESSAGES.CAB_ALREADY_EXIST_WITH_THIS_REGISTERED_NO,
      code: HTTP_STATUS_CODES.CODES.BAD_REQUEST,
      type: ERROR_TYPES.TYPES.BAD_REQUEST,
    });
  }

  const cabObject = {
    registrationNo: registrationNo.toUpperCase(),
    brand,
    model,
    location,
    type,
    driverId,
  };
  // Save Cab Details
  const cabDetail = new Cab(cabObject);
  await cabDetail.save();
  // Update cabId in driver collection
  await Driver.findOneAndUpdate(
    { _id: driverId },
    { $set: { currentCabId: cabDetail._id } },
    { new: true },
  );
  return cabDetail.safeObject();
}

module.exports = registerCab;
