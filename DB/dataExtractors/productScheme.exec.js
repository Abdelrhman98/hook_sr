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
    var fetcherFinalFilter ;
    if(schemaHandler){
        const generalScheme = await getGeneralScheme()
        fetcherFinalFilter = generalizeObjectByKey( generalScheme, fetcherScheme.scheme )
        Object.keys(fetcherFinalFilter).forEach(ele=>{
            if(!fetcherFinalFilter[ele])
                delete fetcherFinalFilter[ele]
        })
    }
    fetcherFinalFilter["_id"]=0
    return {filter:fetcherFinalFilter , sub_keys:fetcherScheme.sub_keys }
}

module.exports = {
    addNewScheme,
    getFetcherScheme,
    getGeneralScheme
}