const createHttpError = require('http-errors')
//* Include joi to check error type 
const Joi = require('joi')
//* Include all validators
const Validators = require('../validators/validators')
const {createErrorArrayUsingKey} = require('../helpers/objArray.help')
module.exports = function(validator) {
    
    //! If validator is not exist, throw err
    if(!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async function(req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body, { abortEarly: false })
            req.body = validated
            next()
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if(err.isJoi) {
                const joiErrors = createErrorArrayUsingKey(err['details'], 'message')
                res.send({validationErrors: joiErrors})
                //return next()
            }
                
            next(createHttpError(500))
        }
    }
}
