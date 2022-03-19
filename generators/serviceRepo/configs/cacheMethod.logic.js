
const servicesExec =  require('../../../DB/dataExtractors/services.exec')

module.exports = {
    cacheAllProd        : servicesExec.getAllProductsForServiceRepo,
    cacheAll_uat        : servicesExec.cacheAllProd_uat
}