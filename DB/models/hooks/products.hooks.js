const {getLastServiceId} = require('../../dataExtractors/products.exec')

async function hook_generateAndSetServiceId(){
    let last_id = await fins.find().sort({'ser_id':-1}).limit(1).exec()
    this.ser_id = last_id[0].ser_id + 1
    console.log(this.ser_id)
}

module.exports = {hook_generateAndSetServiceId}