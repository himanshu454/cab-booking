const _paginationHandler = {};

function isSafe(num) {
  if (num < 0) {
    return false;
  }
  return Number.isSafeInteger(num);
}

_paginationHandler.safePaginationParams = function ({ pageSize, pageNo }) {
  const paginationObject = {
    pageNo: isSafe(pageNo) ? pageNo : 1,
    pageSize: isSafe(pageSize) ? pageSize : 10,
  };
  return paginationObject;
};

_paginationHandler.hasNext = function ({ pageSize, pageNo, total }) {
  return pageSize * pageNo > total;
};

module.exports = _paginationHandler;
