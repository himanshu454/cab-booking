'use strict';

/*
 * This file imports all the required controllers
 */

const express = require('express');
const app = express();

const AdminRoute = require('./admin-module/admin.route');
const RiderRoute = require('./rider-module/rider.route');
const BookingRoute = require('./booking-module/booking.route');

// Mount Routes
app.use('/admin', AdminRoute);
app.use('/rider', RiderRoute);
app.use('/rider', BookingRoute);

module.exports = app;
