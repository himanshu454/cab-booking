require('../');

const _models = {
  Driver: require('./schema/driver').model,
  Rider: require('./schema/rider').model,
  Admin: require('./schema/admin').model,
  Cab: require('./schema/cab').model,
  Booking: require('./schema/booking').model,
};

module.exports = _models;
