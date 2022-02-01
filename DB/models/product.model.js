const mongoose = require('mongoose'); 

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
    }
});


product_schema.pre("save", async function(next){
    if(this.isNew){
        let x = await fins.find().sort({'ser_id':-1}).limit(1).exec()
        this.ser_id = x[0].ser_id + 1
    }
    next()
})
const fins = mongoose.model('fins', product_schema);
//Export the model  
module.exports = fins