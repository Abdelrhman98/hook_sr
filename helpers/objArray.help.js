

function createObjectKeyAndValue(array, key){
    var genObject = {}
    array.forEach((element) => {
        genObject[element[key]] = element
        delete element[key]
    })
    return genObject
}


module.exports = {
    createObjectKeyAndValue
}