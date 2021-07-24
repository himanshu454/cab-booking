const { Cab } = require('../../infra/database/models');
const PaginationHandler = require('../../infra/utils/paginationHandler');

/**
 * Function for getting nearBy Cabs.
 * @param {*} longitude
 * @param {*} latitude
 * @param {*} pageNo
 * @param {*} pageSize
 */

async function getNearByCabs({ longitude, latitude, pageNo, pageSize }) {
  // Convert string to Number
  pageNo = parseInt(pageNo);
  pageSize = parseInt(pageSize);
  // check if pagination params are positive Int
  const pagination = PaginationHandler.safePaginationParams({
    pageSize,
    pageNo,
  });
  // Query to get nearest cabs
  const query = {
    location: {
      $nearSphere: {
        $maxDistance: 10000, // Maximum Range 10 Km
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
    },
    active: true,
  };
  const cabs = await Cab.find(query)
    .skip((pagination.pageNo - 1) * pagination.pageSize)
    .limit(pagination.pageSize);

  return cabs;
}

module.exports = getNearByCabs;
