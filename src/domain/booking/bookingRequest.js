const { Cab, Booking } = require('../../infra/database/models');
const ErrorHandler = require('../../infra/utils/errorHandler');
const {
  RESPONSE_MESSAGES,
  ERROR_TYPES,
  HTTP_STATUS_CODES,
} = require('../../../constants');

/**
 * Function for getting nearBy Cabs.
 * @param {*} riderId
 * @param {*} cabId
 * @param {*} payLoad
 */

async function bookingRequest(riderId, cabId, payload) {
  // check if Cab exist
  const cab = await Cab.findOne({ _id: cabId });
  if (!cab) {
    return ErrorHandler.throwError({
      message: RESPONSE_MESSAGES.MESSAGES.CAB_NOT_FOUND,
      code: HTTP_STATUS_CODES.CODES.DATA_NOT_FOUND,
      type: ERROR_TYPES.TYPES.DATA_NOT_FOUND,
    });
  }
  // StartLocation Data
  const startLocationObject = {
    location: {
      coordinates: [
        payload.startLocation.location.longitude,
        payload.startLocation.location.latitude,
      ],
    },
    address: payload.startLocation.address,
  };
  // EndLocation Data
  const endLocationObject = {
    location: {
      coordinates: [
        payload.endLocation.location.longitude,
        payload.endLocation.location.latitude,
      ],
    },
    address: payload.endLocation.address,
  };
  // Booking Data
  const bookingObject = {
    cabId: cabId,
    riderId: riderId,
    driverId: cab.driverId,
    startLocation: startLocationObject,
    endLocation: endLocationObject,
  };
  // Save data in db
  const booking = Booking.create(bookingObject);
  return booking;
}

module.exports = bookingRequest;
