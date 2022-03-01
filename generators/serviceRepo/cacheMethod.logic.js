
const servicesExec =  require('../../DB/dataExtractors/services.exec')

module.exports = {
    cacheAllProd : servicesExec.getAllProductsForServiceRepo
}