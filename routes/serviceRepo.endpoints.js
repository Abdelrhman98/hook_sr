var express = require('express');
var router = express.Router();

const fs = require('fs')

const serviceRepo_controller = require('../controllers/service_repo.controller')
const Validator =  require('../middlewares/validators.middleware')


router.get("/service/:id",serviceRepo_controller.getServiceById)

router.post("/add_new_service",Validator('product') ,serviceRepo_controller.addNewService)

router.post('/update_service/:id',Validator('product') ,serviceRepo_controller.updateService)

router.get('/serviceRepo/version',  serviceRepo_controller.getServiceRepoLatestVersion )

/* ------------------------------------------------------------------------------------------------------------- */
  // todo=> for downloading latest version of service repo
  //? logic =>> scan file in service repo dir if found one version pass it otherwise path latest with checking 
  //?           latest from mongo collection
/* ------------------------------------------------------------------------------------------------------------- */
router.get("/service_Repo", serviceRepo_controller.generateServiceRepo )

module.exports = router;