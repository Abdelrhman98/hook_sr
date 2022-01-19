var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');
//? MongoConnect
// const MongoUri = require('./connections/mongoClient')


var serviceRepoRouter = require('./routes/serviceRepo.endpoints');
var aggregatorRouter = require('./routes/aggregator.endpoints');

var app = express();


//? defining middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', serviceRepoRouter);
app.use('/aggregator', aggregatorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

http.createServer(app).listen(6001,()=>{
  console.log("sdo0000000000000000000", process.env)
});

// app.listen(6001,()=>{
//   console.log("do", process.env)
// })

module.exports = app;
