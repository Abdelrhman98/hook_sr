const mongoose = require('mongoose'); 


var service_version_export_map = new mongoose.Schema({
        serviceMap:{
            type        :Object,
            required    :true
        },mapVersion:{
            type: Number,
            required:true
        },mapENV:{
            type:String,
            required:true
        }
    },{
    strict: false
});

const serviceVersionMap   = mongoose.model('service_version_export_map', service_version_export_map);

module.exports  = serviceVersionMap