var express = require('express');
var router = express.Router();

const fs = require('fs')
const path = require('path')

const productsModel = require('../DB/models/product.model')
const allProducts = require('./ser.json')
const serviceRepoGenerator = require('../generators/serviceRepo/serviceRepo.gen')
const versioningModel = require('../DB/models/versioning.model')

const {readJsonFromFile} =  require('../helpers/files/file')

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


/* ------------------------------------------------------------------------------------------------------------- */
  // todo=> for downloading latest version of service repo
  //? logic =>> scan file in service repo dir if found one version pass it otherwise path latest with checking 
  //?           latest from mongo collection
/* ------------------------------------------------------------------------------------------------------------- */
router.get("/get_service_Repo", async(req, res, next)=>{

  const inst = new serviceRepoGenerator();
  const { serviceRepoPath , type} = await inst.generator_logic()

  console.log(serviceRepoPath, type)
  const rs = fs.createReadStream(serviceRepoPath);
  res.setHeader("Content-Disposition", "attachment; serviceRepo.json");
  rs.pipe(res)
  res.attachment(serviceRepoPath)
})

router.get('/getEnv',(req, res, next)=>{
  res.send(process.env.ENV)
})




router.get('/test/func',async (req, res, next)=>{
  const inst = new serviceRepoGenerator()
  // const result = await inst.getLatestServiceRepoPath()
  const result = await inst.generator_logic()
  console.log(result)
  res.send(result)
})

router.get('/test', (req, res, next)=>{
  readJsonFromFile(path.resolve('../generators/serviceRepo/serviceRepo12.55.json'))
})
module.exports = router;

//12.51