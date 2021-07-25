const { Booking } = require('../../infra/database/models');

/**
 * Function for admin login.
 * @param {*} bookingId
 * @param {*} status
 */

async function bookingStatus({ bookingId, status }) {
	const criteria = { _id: bookingId }
	const update = {
		$set: {
			status: status
		}
	}
	const options = { new: true }
	const booking = await Booking.findOneAndUpdate(criteria, update, options)
	return booking;
}

module.exports = bookingStatus;
