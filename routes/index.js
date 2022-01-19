var express = require('express');
var router = express.Router();


const serviceRepoGenerator = require('../generators/serviceRepo/serviceRepo.gen')
const versioningModel = require('../DB/models/versioning.model')
/* GET home page. */
router.get('/', function(req, res, next) {
  const newVersion = versioningModel({versionFor:"serviceRepo", version:"12.51"})
  newVersion.save((err, doc)=>{
    if(err)
      console.log(err)
    console.log(doc)
    res.send(doc)
  })
});


router.get('/serviceRepo/version',async (req, res, next)=>{
  var inst = new serviceRepoGenerator()  
  inst.generateServiceRepo()
  res.send({ version:await inst.getVesion()})
})

module.exports = router;

//12.51