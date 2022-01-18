const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var product_schema = new mongoose.Schema({
    ser_id:{
        type:Number,
        required:true,
        unique:true,
        index:true
    },
    provider_id:{
        type:Number,
        required:true
    },
    ar_name:{
        type:String,
        required:true,
    },
    data_fields:{
        type:Object
    },
    description:{
        type:String
    },
    en_name:{
        type:String,
        //required:true,
    },
    sp_config:{
        type:Object,
        required:true,
    },
    amount:{
        type:Object,
        required:true
    },
    service_charge:{
        type:Object,
        required:true
    },
    requests:{
        type:Array,
    },
    main_biller:{
        type:String,
        index:true
    },
    receipt:{
        type:Object
    },
    sector:{
        type:String,
        default:""
        //required:true
    }
});

//Export the model  
module.exports = mongoose.model('fins', product_schema);