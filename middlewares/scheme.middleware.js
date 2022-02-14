
const {getFetcherScheme} = require('../DB/dataExtractors/productScheme.exec')

module.exports = async function(req, res, next) {
    (!req.body.scheme)?
        req.body.fetcherFilter = await getFetcherScheme("general", true)
    :
        req.body.fetcherFilter = await getFetcherScheme(req.body.scheme, true),
    next()
}
