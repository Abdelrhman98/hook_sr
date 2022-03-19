const mongoose = require('mongoose'); 
const serviceSchema = require('./schema_Interface/service.interface')
/* 
    TODO this model for adding new service and changing it before publish it as v1 in service collection 
    
*/
var service_preAdd_schema = new mongoose.Schema({
        ...serviceSchema
    },{
    strict: false
});

const servicePreAdd   = mongoose.model('service_preAdd_model', service_preAdd_schema);

module.exports  = servicePreAdd