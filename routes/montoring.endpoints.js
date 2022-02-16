var express = require('express');
var router = express.Router();
const { getProductsByIdsWithSchema      } = require('../DB/dataExtractors/services.exec')

router.post('/allServices', async (req, res, next)=>{
    // console.log(req.body.fetcherFilter.filter)
    res.send(await getProductsByIdsWithSchema([], req.body.fetcherFilter.filter))
})

module.exports = router