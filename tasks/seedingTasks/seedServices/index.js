const services_seeder = require('./input.json')
const servicesExec = require('../../../DB/dataExtractors/services.exec')

module.exports = ()=>{
    services_seeder.forEach( service =>{
        delete service['_id']
        servicesExec.addNewProductToServiceRepo(service)
    })
}