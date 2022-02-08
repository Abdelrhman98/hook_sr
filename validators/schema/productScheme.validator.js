const joi = require('joi')

const productSchemeValidator = joi.object({
    schemeFor       : joi.string().required().min(3),
    scheme          : joi.array().required(),
    schemeType      : joi.string().min(3).max(100).default('with_scheme'),
}).unknown(true)



module.exports = productSchemeValidator