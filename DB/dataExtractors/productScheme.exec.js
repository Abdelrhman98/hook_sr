const productSchemeModel = require('../models/productScheme.model')

async function addNewScheme( schemeObject ){
    const newScheme = productSchemeModel(schemeObject)
    return await newScheme.save()
}

module.exports = {
    addNewScheme
}