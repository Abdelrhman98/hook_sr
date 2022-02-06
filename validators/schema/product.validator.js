const joi = require('joi')

const productValidator = joi.object({
    provider_id     : joi.number().required().min(1),
    ar_name         : joi.string().required().min(1).max(100),
    en_name         : joi.string().required().min(1).max(100),
    description     : joi.string().allow(null, ''),
    sp_config       : joi.object().allow({}),
    amount          : joi.object().required(),
    service_charge  : joi.object().required(),
    requests        : joi.array().required(),
    main_biller     : joi.string().required().min(1),
    receipt         : joi.object({template_id:joi.number().required(), optional:joi.boolean()}).required()
}).unknown(true)


// function validateProduct( productObject ){
// try{
//     const t =  productValidator.validateAsync(productObject)
//     return (t.error?.details.length)?t.error?.details:[]
    
// }catch(e){
//     console.log(e)
//     return e
// }
// }

module.exports = productValidator