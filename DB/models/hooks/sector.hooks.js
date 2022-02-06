const {addProductToSector} = require('../../dataExtractors/sector.exec')


async function hook_addProductToSector(){
    return await addProductToSector(this._id,this.sector)
}

module.exports = {
    hook_addProductToSector
}