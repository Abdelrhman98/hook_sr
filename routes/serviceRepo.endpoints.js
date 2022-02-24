var express = require('express');
var router = express.Router();

const fs = require('fs')
const path = require('path')

const serviceRepoGenerator = require('../generators/serviceRepo/serviceRepo.gen')

const serviceRepo_controller = require('../controllers/service_repo.controller')

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

router.get('/serviceRepo/version',  serviceRepo_controller.getServiceRepoLatestVersion )

/* ------------------------------------------------------------------------------------------------------------- */
  // todo=> for downloading latest version of service repo
  //? logic =>> scan file in service repo dir if found one version pass it otherwise path latest with checking 
  //?           latest from mongo collection
/* ------------------------------------------------------------------------------------------------------------- */
router.get("/service_Repo", serviceRepo_controller.generateServiceRepo )


module.exports = router;

//12.51