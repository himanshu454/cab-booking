'use strict';

/*
 * This file imports all the required controllers
 */

const express = require('express');
const app = express();

const AdminRoute = require('./admin-module/admin.route');

app.use(AdminRoute);

module.exports = app;
