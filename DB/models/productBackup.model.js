const mongoose = require('mongoose'); 
const { hook_addProductToSector } = require('./hooks/sector.hooks')
const { hook_updateVersionForServiceRepo } = require('./hooks/version.hooks')
const { deletePropertyPath } = require('../../helpers/objArray.help')
// Declare the Schema of the Mongo model
var product_schema = new mongoose.Schema({
    ser_id:{
        type:Number,
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
        type:String,
    },
    en_name:{
        type:String,
        default:''
        //required:true,
    },
    sp_config:{
        type:Object,
        default:{}
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
    },isNew:{
        type:Number,
        default:0
    }
});



const fins = mongoose.model('product', product_schema);

module.exports = fins