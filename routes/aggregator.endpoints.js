var express = require('express');
var router = express.Router();

const { createObjectKeyAndValue } = require('../helpers/objArray.help')
const { getProductsWithIds  , getProductsByIdsWithSchema    } = require('../DB/dataExtractors/products.exec')
const {getFetcherScheme} = require('../DB/dataExtractors/productScheme.exec')
const serviceRepoGenerator        = require('../generators/serviceRepo/serviceRepo.gen')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.body)
  res.send('aggregator');
});


router.post("/serviceList", async(req, res, next)=>{
  var {services} =  req.body
  var parsedServices = []
  const inst = new serviceRepoGenerator()
  const version = await inst.getVersion()
  const scheme = getFetcherScheme("aggregator", true)
  
  services.forEach(element => {
      parsedServices.push(parseInt(element)) 
    });
    // getFetcherScheme
    getProductsByIdsWithSchema(parsedServices,scheme).then( products => {
      keyValueProducts = createObjectKeyAndValue(products, "ser_id")
      res.send({"version": version,"availableServices":parsedServices,"serviceList":keyValueProducts});
    }) 
  // getProductsWithIds(parsedServices).then( products => {
  //   keyValueProducts = createObjectKeyAndValue(products, "ser_id")
  //   res.send({"version": version,"availableServices":parsedServices,"serviceList":keyValueProducts});
  // }) 
})

router.get("/test",(req, res)=>{
console.log(aaaaaaaaaaaaaaaaaaaaaaaaaaaaa)
  console.log("ccccccccccccccccccccccccccc")
  res.send(process.env)
})

module.exports = router;
