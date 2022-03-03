const mongoose      = require('mongoose'); 
const serviceSchema = require('./schema_Interface/service.interface')

var service_preAdd_schema = new mongoose.Schema({
        ...serviceSchema,
        version:{
            type:Number,
            default:1
        }
    },{
    strict: false
});

const servicePreAdd   = mongoose.model('service_preAdd_model', service_preAdd_schema);

module.exports  = servicePreAdd