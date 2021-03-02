const express = require('express');
const usersRoutes = require('../routes/users_routes');
const hostsRoutes = require('../routes/hosts_routes');
const placesRoutes = require('../routes/places_routes');
const reservationsRoutes = require('../routes/reservations_routes');

const MongoServer = require('../config/db');
const app = express();

/// 
// initiating Mongo Connection

MongoServer();

// including middlewares needed to handdle req/res
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// // // CORS MiddleWare
app.use((req,res,next)=>{
    res.header(
      "Access-Control-Allow-Origin",
      "*"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,Authorization,token"
    );
    if(req.method==='OPTIONS'){
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    };
    next();
});

// // // using the routes
app.use('/users',usersRoutes);
app.use('/places',placesRoutes);
app.use('/hosting',hostsRoutes);
app.use("/reservations", reservationsRoutes);




app.use((err, req, res, next)=>{
  // any error should return from response
  console.log(err.message);
  res.status(422).send({err: err.message})

})

module.exports = app;