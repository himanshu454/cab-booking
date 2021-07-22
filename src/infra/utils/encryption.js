let jwt = require('jsonwebtoken');
const config = require('../../../config');

const _encryption = {};

_encryption.signToken = async function signToken(data) {
  let token = jwt.sign(data, config.JWT_SECRET, {
    expiresIn: '24h',
  });
  return token;
};

_encryption.verifyToken = async function verifyToken(token) {
  // Assign jwt token
  const secret = config.JWT_SECRET || 'CAB123#';
  return jwt.verify(token, secret);
};

module.exports = _encryption;
