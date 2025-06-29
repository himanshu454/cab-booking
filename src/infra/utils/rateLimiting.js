const rateLimit = require('express-rate-limit');

const _rateLimiter = {};

_rateLimiter.apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50, // limit each IP to 50 requests per windowMs
});

module.exports = _rateLimiter;
