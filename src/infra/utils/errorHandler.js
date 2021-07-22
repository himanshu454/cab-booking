
const _errorHandler = {};

_errorHandler.throwError = ({ code, message, type }) => {
  const error = new Error();
  error.message = message;
  error.code = code || 500;
  error.status = false;
  error.type = type;
  throw error;
};

module.exports = _errorHandler;
