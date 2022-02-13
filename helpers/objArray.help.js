

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


function deletePropertyPath (obj, path) {
    if (!obj || !path) 
        return;

    if (typeof path === 'string') 
        path = path.split('.');

    for (var i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]];
        if (typeof obj === 'undefined') 
            return;
    }
    delete obj[path.pop()];
};


function generalizeObjectByKey(baseObject, object){
    let baseKeys = Object.keys(baseObject)
    let objectKyes = Object.keys(object)
    const key = object[objectKyes[0]],
    notKey = (object[objectKyes[0]])?0:1
    let keysNotInObje = baseKeys.filter(ele => {
        if(!object[ele])return ele
    })
    keysNotInObje.forEach(ele=>{
        baseObject[ele] = notKey
    })
    objectKyes.forEach(ele=>{
        if(typeof object[ele] !='object' && typeof object[ele] !='array')
            baseObject[ele] = key
    })
    baseObject
    return baseObject
}

module.exports = {
    createObjectKeyAndValue,
    createErrorArrayUsingKey,
    createObjectFromArrayAndSetValue,
    generalizeObjectByKey,
    deletePropertyPath
}