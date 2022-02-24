
const {getFetcherScheme} = require('../DB/dataExtractors/productScheme.exec')

module.exports = async function(req, res, next) {
    // req.body.schemeName
    let scheme = req.body.schemeName || req.params.schemeName || "general"
    req.body.fetcherFilter = await getFetcherScheme(scheme, true)
    next()
}
