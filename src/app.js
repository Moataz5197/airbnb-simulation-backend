const express = require('express');
const usersRoutes = require('../routes/users_routes');
const MongoServer = require('../config/db');
const app = express();

/// 
// initiating Mongo Connection

MongoServer();

// including middlewares needed to handdle req/res
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// // // using the routes

app.use('/users',usersRoutes);




app.use((err, req, res, next)=>{
  // any error should return from response
  console.log(err.message);
  res.status(422).send({err: err.message})

})

module.exports = app;