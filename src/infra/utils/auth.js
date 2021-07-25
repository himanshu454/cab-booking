const Encryption = require('./encryption');
const ResponseHandler = require('./responseHandler');
const {
  RESPONSE_MESSAGES,
  ERROR_TYPES,
  HTTP_STATUS_CODES,
} = require('../../../constants');

const getToken = function (req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    // Authorization: Bearer g1jipjgi1ifjioj
    // Handle token presented as a Bearer token in the Authorization header
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    // Handle token presented as URI param
    return req.query.token;
  } else if (req.cookies && req.cookies.token) {
    // Handle token presented as a cookie parameter
    return req.cookies.token;
  }
  // If we return null, we couldn't find a token.
  // In this case, the JWT middleware will return a 401 (unauthorized)
  // to the client for this request
  return null;
};

// Admin auth verify Function
async function adminAuth(req, res, next) {
  const token = getToken(req);
  req.isAuthenticated = false;
  if (!token) {
	  const response = {};
	  response.success = false;
	  response.statusCode = HTTP_STATUS_CODES.CODES.UNAUTHORIZED;
	  response.message = RESPONSE_MESSAGES.MESSAGES.UNAUTHORIZED;
	  return ResponseHandler(res, response);
  }
  const decodedToken = await Encryption.verifyToken(token);
  req.admin = decodedToken;
  req.isAuthenticated = true;
  return next();
}

// User auth verify function
async function userAuth(req, res, next) {
  const token = getToken(req);
  req.isAuthenticated = false;
  if (!token) {
      const response = {};
	  response.success = false;
	  response.statusCode = HTTP_STATUS_CODES.CODES.UNAUTHORIZED;
	  response.message = RESPONSE_MESSAGES.MESSAGES.UNAUTHORIZED;
	  return ResponseHandler(res, response);
  }
  const decodedToken = await Encryption.verifyToken(token);
  req.authUser = decodedToken;
  req.isAuthenticated = true;
  return next();
}

module.exports = {
  userAuth,
  adminAuth
};
