const fs = require('fs')
const serviceRepoGenerator = require('../generators/serviceRepo/serviceRepo.gen')
const { addNewProduct ,getService, updateProduct } = require('../controllers/product.controller')



async function generateServiceRepo(req, res, next){
    const inst = new serviceRepoGenerator();
    const { serviceRepoPath , type} = await inst.generator_logic()
    console.log(serviceRepoPath, type)
    const rs = fs.createReadStream(serviceRepoPath);
    res.setHeader("Content-Disposition", "attachment; serviceRepo.json");
    rs.pipe(res)
    res.attachment(serviceRepoPath)
}

async function getServiceRepoLatestVersion(req, res, next){
    var inst = new serviceRepoGenerator()  
    inst.generateServiceRepo()
    res.send({ version:await inst.getVesion()})
}

async function updateService(req, res, next){
    res.send(await updateProduct(req.params.id, req.body))
}

async function addNewService(req, res, next){
    res.send(await addNewProduct(req.body))
}

async function getServiceById (req,res,next){
    res.send(await getService(req.params.id))
}
module.exports = {
    generateServiceRepo,
    getServiceRepoLatestVersion,
    updateService,
    addNewService,
    getServiceById
}