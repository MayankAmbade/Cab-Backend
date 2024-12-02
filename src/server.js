if(process.env.Node_ENV !== "production"){
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();
const PORT = 8080;
const my_root = require('./routes/index.js');
require('../src/config/database.js')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api' , my_root);



 
app.listen(PORT  , ()=>{
  console.log("server is started " + process.env.PORT  );
})




