const servicesColl = require("../../../DB/models/services.model")
const versioningColl = require('../../../DB/models/versioning.model')
const sectorColl = require("../../../DB/models/sectors.model")
const providerColl = require('../../../DB/models/provider.model')
const productSchemeColl = require('../../../DB/models/productScheme.model')
const mainBillersColl = require('../../../DB/models/main_biller.model')
module.exports = {
    servicesColl,
    versioningColl,
    sectorColl,
    providerColl,
    productSchemeColl,
    mainBillersColl
}