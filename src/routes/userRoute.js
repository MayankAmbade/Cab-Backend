const express = require('express');
const route = express.Router();
const userController = require('../controller/userController.js');


route.post('/resister',userController.ResisterUser );


module.exports = route;

