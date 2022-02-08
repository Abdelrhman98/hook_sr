var express = require('express');
var router = express.Router();

const Validator =  require('../middlewares/validators.middleware')
const productScheme = require('../controllers/productScheme.controller')

router.post('/add_scheme',Validator('productSchemeValidator'), productScheme.addNewProductScheme)

module.exports = router