const baseVersion = require('./versions/versions.json'),
    updatedVersion = require('./versions/serviceRepo12.80.json')
const {writeJson} = require('../helpers/files/file')

    var base= baseVersion.data,
    updated = updatedVersion.data,
    finalObj = [],
    newSers = []


var getServiceById = (obj,id)=>{
    return obj.filter(ele=>{
        return ele.ser_id == id
    })
}

var mergePropsFromUpdated = (baseObj, updatedObj, arrayOfProps)=>{
    let finalService = baseObj
    arrayOfProps.forEach( prop =>{
        finalService[prop] = updatedObj[prop]
    })
    return finalService
}

base.forEach(ele=>{
    let service = getServiceById(updated,ele.ser_id)
    if(!service.length){
        ele["sector"]="new"
        newSers.push(ele)
    }

        
    else{
        // console.log(service[0])
        finalObj.push(mergePropsFromUpdated(ele, service[0],["sector", "main_biller","_id"]))
    }
})

// writeJson('final.json',finalObj)
// writeJson('new.json', newSers)

console.log(newSers.length)
//console.log(finalObj.length)


