/************* Modules ***********/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const _rider = {};

/**************************************************
 ************* Rider Model or Collection ***********
 **************************************************/

_rider.schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    active: { type: Boolean, default: true },
    password: { type: String, required: true },
    country: { type: String },

    // email verification related
    verified: { type: Boolean, required: false, default: true },
    verificationToken: { type: String },
  },
  { usePushEach: true },
  { runSettersOnQuery: true },
);

/**********Set Timestamps ************/
_rider.schema.set('timestamps', true);

/**************************************************
 *********** Password Hashing Function ************
 **************************************************/

_rider.hashPassword = function hashPassword(password) {
  const saltRounds = 5;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

_rider.schema.pre('save', function (next) {
  const rider = this;
  // only hash the password if it has been modified (or is new)
  if (!rider.isModified('password')) return next();
  rider.password = _rider.hashPassword(rider.password);
  next();
});

_rider.schema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

_rider.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'country',
    'active',
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

_rider.model = mongoose.model('rider', _rider.schema);

module.exports = _rider;
