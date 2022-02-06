
const { 
    updateVersionByName, 
    getVersionByName
} = require('../../dataExtractors/version.exec')

async function hook_updateVersionForServiceRepo(){
    let versionForServiceRepo = await getVersionByName("serviceRepo"),
    floatVersion    = parseFloat( versionForServiceRepo[0].version )
    floatVersion    = parseFloat((floatVersion + 0.01).toFixed(2))
    return await updateVersionByName("serviceRepo", floatVersion)
}


module.exports = {
    hook_updateVersionForServiceRepo
}