const fs = require('fs')
const path = require('path')


const serviceRepoGenerator = require('../generators/serviceRepo/serviceRepo.gen')

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

module.exports = {
    generateServiceRepo,
    getServiceRepoLatestVersion
}