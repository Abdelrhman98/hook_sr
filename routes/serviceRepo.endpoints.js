var express = require('express');
var router = express.Router();

const fs = require('fs')
const path = require('path')

const serviceRepoGenerator = require('../generators/serviceRepo/serviceRepo.gen')

const { readJsonFromFile } =  require('../helpers/files/file')
const { addNewProduct ,getService, updateProduct } = require('../controllers/product.controller')

const Validator =  require('../middlewares/validators.middleware')


router.get("/service/:id", async (req,res,next)=>{
  res.send(await getService(req.params.id))
})

router.post("/add_new_service",Validator('product') , async (req, res, next)=>{
  res.send(await addNewProduct(req.body))
})

router.post('/update_service/:id',Validator('product') , async (req, res, next)=>{
  res.send(await updateProduct(req.params.id, req.body))
})

router.get('/serviceRepo/version',async (req, res, next)=>{
  var inst = new serviceRepoGenerator()  
  inst.generateServiceRepo()
  res.send({ version:await inst.getVesion()})
})

/* GET home page. */
router.get('/', function(req, res, next) {

});



router.post('/service', (req, res, next)=>{
  
})

// router.get('/seed',(req, res, next)=>{
//   allProducts.data.forEach((ele)=>{
//     var x = productsModel(ele)
    
//     x.save((err, doc)=>{
//       if(err)
//         console.log(err)
//       console.log(doc)
//     })
//   })
  
// })


/* ------------------------------------------------------------------------------------------------------------- */
  // todo=> for downloading latest version of service repo
  //? logic =>> scan file in service repo dir if found one version pass it otherwise path latest with checking 
  //?           latest from mongo collection
/* ------------------------------------------------------------------------------------------------------------- */
router.get("/service_Repo", async(req, res, next)=>{
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