/************* Modules ***********/
const { BOOKING } = require('../../../../../constants');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingStatus = BOOKING.BOOKING_STATUS;

const _booking = {};

/**************************************************
 ****************** Schema Objects *****************
 ***************************************************/

const MapGrid = new Schema({
  type: { type: String, enum: ['Point'] },
  coordinates: [{ type: Number, index: '2dsphere' }],
});

const Address = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipCode: { type: String },
});

const LocationDetails = new Schema({
  location: { type: MapGrid },
  address: { type: Address },
});

/**************************************************
 ************* Booking Model or collection ***********
 **************************************************/

_booking.schema = new Schema(
  {
    riderId: { type: Schema.Types.ObjectId, ref: 'rider' },
    cabId: { type: Schema.Types.ObjectId, ref: 'cab' },
    driverId: { type: Schema.Types.ObjectId, ref: 'driver' },
    startLocation: { type: LocationDetails },
    endLocation: { type: LocationDetails },
    active: { type: Boolean, default: true },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.REQUESTED,
    },
  },
  { usePushEach: true },
  { runSettersOnQuery: true },
);

/**********Set Timestamps ************/
_booking.schema.set('timestamps', true);

/**************************************************
 ********SafeFields Function to be returned ********
 ***************************************************/

_booking.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'riderId',
    'cabId',
    'driverId',
    'startLocation',
    'EndLocation',
    'status',
    'createdAt',
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

/**************************************************
 **********Interface or define collection name *****
 ***************************************************/
_booking.model = mongoose.model('booking', _booking.schema);

module.exports = _booking;
