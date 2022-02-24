var express = require('express');
var router = express.Router();
const { getProductsByIdsWithSchema } = require('../DB/dataExtractors/services.exec')

router.post('/service_repo', async (req, res, next)=>{
    await getProductsByIdsWithSchema([], req.body.fetcherFilter.filter)
})

module.exports = router