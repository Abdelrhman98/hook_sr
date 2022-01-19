const versionModel = require('../models/versioning.model')

function getVersionByName(name){
    return versionModel.find({versionFor:name}).exec()
}


module.exports = {
    getVersionByName
}