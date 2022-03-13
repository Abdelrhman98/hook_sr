const SRGEN = require('../../../generators/serviceRepo/serviceRepoINH.gen')
const fsHelper = require('../../../helpers/files/file')
const {getAllProductsForServiceRepo} = require('../../../DB/dataExtractors/services.exec')
const main = async()=>{
    let allServices = await getAllProductsForServiceRepo()
    fsHelper.writeJson("./test.json", allServices)
}

module.exports = main

