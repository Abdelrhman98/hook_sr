var express = require('express');
var router = express.Router();

const { createObjectKeyAndValue, cleanObjectsByPaths } = require('../helpers/objArray.help')
const { getProductsWithIds  , getProductsByIdsWithSchema    } = require('../DB/dataExtractors/products.exec')

const serviceRepoGenerator        = require('../generators/serviceRepo/serviceRepo.gen')

const schemeMiddleware = require('../middlewares/scheme.middleware')

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
  services.forEach(element => {
      parsedServices.push(parseInt(element))
  });
  getProductsWithIds(parsedServices).then( products => {
    keyValueProducts = createObjectKeyAndValue(products, "ser_id")

    res.send({"version": version,"availableServices":parsedServices,"serviceList":keyValueProducts});
  }) 
})


router.post("/serviceList2", schemeMiddleware, async(req, res, next)=>{
  var {services} =  req.body
  var parsedServices = []
  const inst = new serviceRepoGenerator()
  const version = await inst.getVersion()

  services.forEach(element => { parsedServices.push(parseInt(element)) });
    getProductsByIdsWithSchema(parsedServices , req.body.fetcherFilter.filter).then( products => {
      req.body.fetcherFilter.sub_keys
      cleanObjectsByPaths(products, req.body.fetcherFilter.sub_keys)
      console.log(products)
      // console.log(req.body.fetcherFilter.sub_keys)
      keyValueProducts = createObjectKeyAndValue(products, "ser_id")
      res.send({"version": "v1.0","availableServices":parsedServices,"serviceList":keyValueProducts});
    }) 
})

router.get("/test",(req, res)=>{
console.log(aaaaaaaaaaaaaaaaaaaaaaaaaaaaa)
  console.log("ccccccccccccccccccccccccccc")
  res.send(process.env)
})

module.exports = router;
