const versionModel = require('../models/versioning.model')

function getVersionByName(name){
    return versionModel.find({versionFor:name}).exec()
}

async function updateVersionByName( name , value){
    return await versionModel.findOneAndUpdate({versionFor:name},{$set:{version:value}}).exec()
}

function addNewVersion( name, value="1.0" ){
    let newVersion = versionModel({versionFor:name, version:value})
    return newVersion.save()
}
module.exports = {
    getVersionByName,
    updateVersionByName,
    addNewVersion
}