const mongoose = require('mongoose'); 

var service_export_log = new mongoose.Schema({
    ser_id:{

    },
    type:{

    },
});

//Export the model
module.exports = mongoose.model('service_export_log', service_export_log);