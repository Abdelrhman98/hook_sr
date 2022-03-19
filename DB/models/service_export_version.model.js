const mongoose = require('mongoose');
const serviceVersionInterface = require('./schema_Interface/serviceVersion.interface')

var versionObject = new mongoose.Schema({
    ...serviceVersionInterface
});

var service_export_version = new mongoose.Schema({
    ser_id:{
        type:Number,
        required:true,
        unique:true,
        index:true,
    },
    prod_export:{
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