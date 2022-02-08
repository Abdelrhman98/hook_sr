const { addNewScheme } = require('../DB/dataExtractors/productScheme.exec')
const { createObjectFromArrayAndSetValue } = require('../helpers/objArray.help')

async function addNewProductScheme(req, res, next){
    const value = (req.body.schemeType == 'with_scheme')?1:0
    req.body.scheme = createObjectFromArrayAndSetValue(req.body.scheme,value)
    console.log(req.body)
    res.send(await addNewScheme(req.body))
}

module.exports = {
    addNewProductScheme
}