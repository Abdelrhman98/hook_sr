

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
module.exports = {
    createObjectKeyAndValue,
    createErrorArrayUsingKey
}