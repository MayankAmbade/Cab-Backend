const express = require('express');
const rootRouter = express.Router();

const multiApi = require('./userRoute.js');

rootRouter.use('/' , multiApi);

module.exports = rootRouter;