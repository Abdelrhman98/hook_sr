const versionModel = require('../models/versioning.model')

function getVersionByName(name){
    return versionModel.find({versionFor:name}).exec()
}


async function updateVersionByName( name , value){
    return await versionModel.findOneAndUpdate({versionFor:name},{$set:{version:value}}).exec()
}

module.exports = {
    getVersionByName,
    updateVersionByName
}