const mongoose = require('mongoose'); 

var service_export_log = new mongoose.Schema({
    ser_id:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    logMessage:{
        type:String,
        required:true
    },
    created_at:{
        type: Date,
        default:Date.now()
    }
});

//Export the model
module.exports = mongoose.model('service_export_log', service_export_log);