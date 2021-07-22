/************* Modules ***********/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const _driver = {};

/**************************************************
 ************* Driver Model or Collection ***********
 **************************************************/

_driver.schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    currentCabId: { type: String, required: true }, // Current Cab Id (In case he change his car)
    phoneNumber: { type: String, required: true },
    isAvailable: { type: Boolean }, // Check drivers availability for ride
    active: { type: Boolean, default: true },
  },
  { usePushEach: true },
  { runSettersOnQuery: true },
);

/**********Set Timestamps ************/
_driver.schema.set('timestamps', true);

/**************************************************
 *********** SafeFields Function to be returned ****
 **************************************************/

_driver.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'name',
    'email',
    'phoneNumber',
    'currentCabId',
    'verified',
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

_driver.model = mongoose.model('driver', _driver.schema);

module.exports = _driver;
