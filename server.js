//get express modules
const express = require("express");

const path = require('path');
//body parser module which allows for data to be passed through the body
const bodyParser = require("body-parser");

const searchMedia = require('./routes/searchMedia');
const searchAll = require('./routes/searchAll');
const welcome = require('./routes/welcome');
const favourite = require('./routes/favourite');
const getList = require('./routes/getList');

//fetch module
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/search/:term/:media", searchMedia);
app.get("/search/:term", searchAll);
app.get("/", welcome);
app.get("/api/batman", getList);
app.get("/api/favourites", favourite);

//helmet module provides  a bit of security
const helmet = require('helmet');
app.use(helmet());




//local port at 8000 since create-react-app always runs on 3000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,
  'frontend', 'build','index.html'));
  });
  }

  
/*
//error handler. '*' catces every undefined route and error message gets displayed
app.get('*', function(request, response, next) {
  let err = new Error("Sorry! Can’t find that resource. Please check your URL");
  err.statusCode = 404;
  next(err);
})*/


module.exports = app;