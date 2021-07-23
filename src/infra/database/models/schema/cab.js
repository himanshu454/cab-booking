/************* Modules ***********/
const { CAB } = require('../../../../../constants');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const cabType = CAB.CAB_TYPE;

const _cab = {};

/**************************************************
 ****************** Schema Objects *****************
 ***************************************************/

const MapGrid = new Schema({
  type: { type: String, enum: ['Point'] },
  coordinates: [{ type: Number, index: '2dsphere' }],
});

/**************************************************
 *************** Cab Model or Collection ***********
 **************************************************/

_cab.schema = new Schema(
  {
    registrationNo: { type: String, required: true, unique: true },
    brand: { type: String }, // Brand of car
    model: { type: String, required: true },
    active: { type: Boolean, default: true },
    location: { type: MapGrid },
    driverId: { type: Schema.Types.ObjectId, ref: 'driver' },
    type: {
      type: String,
      enum: Object.values(cabType),
      default: cabType.CAR,
    },
  },
  { usePushEach: true },
  { runSettersOnQuery: true },
);

/**********Set Timestamps ************/
_cab.schema.set('timestamps', true);

/**************************************************
 *********** SafeFields Function to be returned ****
 **************************************************/

_cab.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'registrationNo',
    'brand',
    'model',
    'location',
    'driverId',
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

_cab.model = mongoose.model('cab', _cab.schema);

module.exports = _cab;
