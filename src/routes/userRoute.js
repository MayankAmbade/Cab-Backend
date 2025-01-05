const express = require('express');
const route = express.Router();
const userController = require('../controller/userController.js');
const DriverController = require('../controller/DriverController.js');
const AdminController = require('../controller/AdminController.js');


route.post('/Generate-Otp' , userController.GenerateOtp)
route.post('/get-otp' , userController.GetOtp)


module.exports = route;

