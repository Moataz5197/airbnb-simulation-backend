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
const cookieParser = require('cookie-parser');
app.use(cookieParser());
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


const extendTimeoutMiddleware = (req, res, next) => {
  const space = ' ';
  let isFinished = false;
  let isDataSent = false;

  // Only extend the timeout for API requests
  if (!req.url.includes('/api')) {
    next();
    return;
  }

  res.once('finish', () => {
    isFinished = true;
  });

  res.once('end', () => {
    isFinished = true;
  });

  res.once('close', () => {
    isFinished = true;
  });

  res.on('data', (data) => {
    // Look for something other than our blank space to indicate that real
    // data is now being sent back to the client.
    if (data !== space) {
      isDataSent = true;
    }
  });

  const waitAndSend = () => {
    setTimeout(() => {
      // If the response hasn't finished and hasn't sent any data back....
      if (!isFinished && !isDataSent) {
        // Need to write the status code/headers if they haven't been sent yet.
        if (!res.headersSent) {
          res.writeHead(202);
        }

        res.write(space);

        // Wait another 15 seconds
        waitAndSend();
      }
    }, 15000);
  };

  waitAndSend();
  next();
};
app.use(extendTimeoutMiddleware);

app.use((err, req, res, next)=>{
  // any error should return from response
  console.log(err.message);
  res.status(422).send({err: err.message})

})

module.exports = app;