var express = require('express');
var router = express.Router();

const {createObjectKeyAndValue} = require('../helpers/objArray.help')
const {getProductsWithIds} = require('../DB/dataExtractors/products.exec')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.body)
  res.send('aggregator');
});

router.post("/serviceList", (req, res, next)=>{
  var {services} =  req.body
  getProductsWithIds(services).then( products => {
    keyValueProducts = createObjectKeyAndValue(products, "ser_id")

    res.send({"serviceList":keyValueProducts});
  }) 
})

router.get("/test",(req, res)=>{
  console.log("c")
  res.send(process.env)
})

module.exports = router;
