var express = require('express');
var router = express.Router();


const productsModel = require('../DB/models/product.model')
const allProducts = require('./ser.json')
const serviceRepoGenerator = require('../generators/serviceRepo/serviceRepo.gen')
const versioningModel = require('../DB/models/versioning.model')
/* GET home page. */
router.get('/', function(req, res, next) {
  const newVersion = versioningModel({versionFor:"serviceRepo", version:"12.51"})
  newVersion.save((err, doc)=>{
    if(err)
      console.log(err)
    console.log(doc)
    res.send(doc); 
  })
});


router.get('/serviceRepo/version',async (req, res, next)=>{
  var inst = new serviceRepoGenerator()  
  inst.generateServiceRepo()
  res.send({ version:await inst.getVesion()})
})

router.get('/seed',(req, res, next)=>{
  allProducts.data.forEach((ele)=>{
    var x = productsModel(ele)
    
    x.save((err, doc)=>{
      if(err)
        console.log(err)
      console.log(doc)
    })
  })
  
})

router.get('/getEnv',(req, res, next)=>{
  res.send(process.env.ENV)
})

module.exports = router;

//12.51