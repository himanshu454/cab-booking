const { Booking } = require('../../infra/database/models');
const PaginationHandler = require('../../infra/utils/paginationHandler');
const mongoose = require('mongoose');

/**
 * Function for getting nearBy Cabs.
 * @param {*} longitude
 * @param {*} latitude
 * @param {*} pageNo
 * @param {*} pageSize
 */

async function getBookings(riderId, { pageNo, pageSize }) {
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
        riderId: mongoose.Types.ObjectId(riderId),
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
      },
    },
  ];
  const bookings = await Booking.aggregate(query);
  return bookings;
}

module.exports = getBookings;
