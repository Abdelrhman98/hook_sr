const mongoose      = require('mongoose'); 
const serviceSchema = require('./schema_Interface/service.interface')

var service_history_schema = new mongoose.Schema({
        ...serviceSchema
    },{
    strict: false
});

const serviceHistoryAdd = mongoose.model('service_history_model', service_history_schema);

module.exports  = serviceHistoryAdd