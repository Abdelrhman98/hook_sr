

function createObjectKeyAndValue(array, key){
    var genObject = {}
    array.forEach((element) => {
        genObject[element[key]] = element
        delete element[key]
    })
    return genObject
}

function createErrorArrayUsingKey(array, key){
    var errObject = {}
    array.forEach((element) => {
        errObject[element.context.label] = element[key]
    })
    return errObject
}

function createObjectFromArrayAndSetValue(array, value=1){
    let obj = {}
    array.forEach( ele =>{
        obj[ele] = value
    })
    return obj
}
module.exports = {
    createObjectKeyAndValue,
    createErrorArrayUsingKey,
    createObjectFromArrayAndSetValue
}