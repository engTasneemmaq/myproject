'use strict';
require('dotenv').config();
const server = require('./auth/src/server');
const { db } = require("./auth/src/module/index");



db.sync().then(() => {
    server.start();
});