const all_collection = require('./collections')
const fsHelper = require('../../../helpers/files/file')
const exportPath = "./export/data"
var exportAll = (cb)=>{
    Object.keys( all_collection).forEach((collection) => {
        console.log(collection)
        all_collection[collection].find().exec().then(data=>{
            console.log(`${collection}`,data.length)
            fsHelper.writeJson(`${exportPath}/${collection}.json`, data)
            cb()
        })
    })

}

module.exports = exportAll