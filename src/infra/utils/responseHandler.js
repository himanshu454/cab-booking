function handleResponse(res, { statusCode, data, message, success, type }) {
  const response = {
    success: success || false,
    message: message,
    data: data || {},
  };
  if (type) response.type = type;
  return res.status(statusCode).json(response);
}

module.exports = handleResponse;
