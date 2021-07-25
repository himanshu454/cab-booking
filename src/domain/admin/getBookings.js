const { Booking } = require('../../infra/database/models');
const PaginationHandler = require('../../infra/utils/paginationHandler');

/**
 * Function for getting bookings.
 * @param {*} status
 * @param {*} pageNo
 * @param {*} pageSize
 */

async function getBookings({ status, pageNo, pageSize }) {
  // Convert string to Number
  pageNo = parseInt(pageNo);
  pageSize = parseInt(pageSize);
  // check if pagination params are positive Int
  const pagination = PaginationHandler.safePaginationParams({
    pageSize,
    pageNo,
  });
  const query = [
    {
      $match: {
        status: status,
      },
    },
    {
      $lookup: {
        from: 'cabs',
        localField: 'cabId',
        foreignField: '_id',
        as: 'cabDetail',
      },
    },
    {
      $unwind: { path: '$cabDetail', preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: 'drivers',
        localField: 'driverId',
        foreignField: '_id',
        as: 'driverDetail',
      },
    },
    {
      $unwind: { path: '$driverDetail', preserveNullAndEmptyArrays: true },
    },
    {
      $skip: (pagination.pageNo - 1) * pagination.pageSize,
    },
    {
      $limit: pagination.pageSize,
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        __v: 0,
        updatedAt: 0,
        startLocation: 0,
        endLocation: 0,
      },
    },
  ];
  const bookings = await Booking.aggregate(query);
  return bookings;
}

module.exports = getBookings;
