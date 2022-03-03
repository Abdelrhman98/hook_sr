const mongoose      = require('mongoose'); 
const serveiceSchema = require('./schema_Interface/service.interface')

var service_postAdd_schema = new mongoose.Schema({
        ...serveiceSchema
    },{
    strict: false
});

const servicePostAdd   = mongoose.model('service_postAdd_model', service_postAdd_schema);

module.exports  = servicePostAdd