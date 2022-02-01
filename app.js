var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');

const {getLastServiceId} =  require('./DB/dataExtractors/products.exec')

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



const product = require('./DB/models/product.model')
app.post('/asd',async (req, res, next)=>{

  // await getLastServiceId().then(doc=>{
  //   console.log(doc[0].ser_id);
  // })
  // var x= product(req.body)
  // x.save((err, doc)=>{
  //   if(err)
  //   console.log(err)
  //   //console.log(doc);
  // })

  
})
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

