var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');

require('dotenv').config()

//? MongoConnect
const MongoConnection = require('./connections/mongoClient')

//? configrations
const PORT = 3000||process.env.PORT

//? routers
var serviceRepoRouter = require('./routes/serviceRepo.endpoints');
var aggregatorRouter = require('./routes/aggregator.endpoints');

var app = express();


//? defining middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//?routing 
app.use('/', serviceRepoRouter);
app.use('/aggregator', aggregatorRouter);

//?error handling
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//? run app
app.listen(PORT,()=>{
  console.log("dooooo", PORT )
})

