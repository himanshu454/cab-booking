/************* Modules ***********/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const _rider = {};

/**************************************************
 ************* Rider Model or Collection ***********
 **************************************************/

_rider.schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, unique: true },
    active: { type: Boolean, default: true },
    password: { type: String },
    country: { type: String },

    // email verification related
    verified: { type: Boolean, required: false },
    verificationToken: { type: String },
  },
  { usePushEach: true },
  { runSettersOnQuery: true },
);

/**********Set Timestamps ************/
_rider.schema.set('timestamps', true);

_rider.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'country',
    'active',
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

_rider.model = mongoose.model('rider', _rider.schema);

module.exports = _rider;
