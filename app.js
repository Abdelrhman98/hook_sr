var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');



require('dotenv').config()

//? MongoConnect
const MongoConnection = require('./connections/mongoClient')
const schemeMiddleware = require('./middlewares/scheme.middleware')

//? configrations
const PORT = 3000||process.env.PORT

//? routers
var serviceRepoRouter = require('./routes/serviceRepo.endpoints');
var aggregatorRouter = require('./routes/aggregator.endpoints');
var productSchemeRouter = require('./routes/productScheme.endpoints')
var monitoringRouter = require('./routes/montoring.endpoints')
var app = express();


//? defining middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(schemeMiddleware)
//?routing 
app.use('/',            serviceRepoRouter  );
app.use('/aggregator' , aggregatorRouter   );
app.use('/scheme',      productSchemeRouter)
app.use('/monitor'    , monitoringRouter   )

//?error handling
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//? run app
app.listen(PORT,()=>{
  
  console.log("dooooo", PORT )
})

