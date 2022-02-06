const sectorModel = require('../models/sectors.model')

async function addProductToSector( productId, sector ){
    return await sectorModel.findOneAndUpdate({ar_name:sector}, {$push:{products:productId}})
}

module.exports = {
    addProductToSector
}