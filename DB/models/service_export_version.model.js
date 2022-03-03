const mongoose = require('mongoose');

var versionObject = new mongoose.Schema({
    released_version:{
        type:String,
        default:"1.0"
    },
    isWorking:{
        type:Boolean,
        default:true
    },
    created_at:{
        type: Date,
        default:Date.now()
    },
    updated_at:{
        type:Date
    }
});

var service_export_version = new mongoose.Schema({
    ser_id:{
        type:Number,
        required:true,
        unique:true,
        index:true,
    },prod_export:{
        versionObject
    },
    uat_export:{
        versionObject
    },dev_export:{
        versionObject
    }
});

//Export the model
module.exports = mongoose.model('service_export_version', service_export_version);