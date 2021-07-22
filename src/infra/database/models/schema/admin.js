/************* Modules ***********/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const _admin = {};

/**************************************************
 *************** Admin Model or Collection ***********
 **************************************************/

_admin.schema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true },
  },
  { usePushEach: true },
  { runSettersOnQuery: true },
);

/**********Set Timestamps */
_admin.schema.set('timestamps', true);

/**************************************************
 *********** SafeFields Function to be returned ****
 **************************************************/

_admin.hashPassword = function hashPassword(password) {
  const saltRounds = 5;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

_admin.schema.pre('save', function (next) {
  const admin = this;
  // only hash the password if it has been modified (or is new)
  if (!admin.isModified('password')) return next();
  admin.password = _admin.hashPassword(admin.password);
  next();
});

_admin.schema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

_admin.schema.methods.safeObject = function () {
  const safeFields = ['_id', 'email', 'createdAt'];
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

_admin.model = mongoose.model('admin', _admin.schema);

module.exports = _admin;
