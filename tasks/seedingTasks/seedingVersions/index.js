const version_seeder = require('./input.json')
const versionExec = require('../../../DB/dataExtractors/version.exec')

module.exports = ()=>{
    version_seeder.forEach( version =>{
        delete version['_id']
        versionExec.getVersionByName( version.versionFor ).then( checkedVersion=>{
            if(!checkedVersion[0]){
                versionExec.addNewVersion( version.versionFor, version.version )
            }
        })
        // versionExec.addNewVersion(version)
    })
}