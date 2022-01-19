var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')

//? MongoConnect
const MongoUri = require('./connections/mongoClient')


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

app.listen(3000,()=>{
  console.log("do")
})

module.exports = app;
