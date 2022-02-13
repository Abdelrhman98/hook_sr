const productSchemeModel = require('../models/productScheme.model')
const {generalizeObjectByKey} = require('../../helpers/objArray.help')
const GENERAL = "general"
async function addNewScheme( schemeObject ){
    const newScheme = productSchemeModel(schemeObject)
    return await newScheme.save()
}

async function getGeneralScheme(){
    fetcherScheme = await productSchemeModel.findOne({schemeFor : GENERAL }).exec()
    return fetcherScheme.scheme
}

async function getFetcherScheme( fetcher_name , schemaHandler = false){
    var fetcherScheme = await productSchemeModel.findOne({schemeFor : fetcher_name }).exec()
    if(schemaHandler){
        const generalScheme = await getGeneralScheme()
        fetcherScheme = generalizeObjectByKey( generalScheme, fetcherScheme.scheme )
    }
    return fetcherScheme
}

module.exports = {
    addNewScheme,
    getFetcherScheme,
    getGeneralScheme
}