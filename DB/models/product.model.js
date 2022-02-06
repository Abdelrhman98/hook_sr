const mongoose = require('mongoose'); 
const { hook_addProductToSector } = require('./hooks/sector.hooks')
const { hook_updateVersionForServiceRepo } = require('./hooks/version.hooks')
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



async function hook_generateSerIdBasedOnLastService(){
    //console.log(this)
    let last_id = await fins.find().sort({'ser_id':-1}).limit(1).exec()
    this.ser_id = last_id[0].ser_id + 1
    //return 
}

product_schema.pre("save", async function(next){
    if(this.isNew){
        await hook_generateSerIdBasedOnLastService.bind(this)()
    }
    next()
})

product_schema.post('findOneAndUpdate', async function(){
    hook_updateVersionForServiceRepo()
})


product_schema.post('save', async function(){
    hook_addProductToSector.bind(this)()
    hook_updateVersionForServiceRepo()
})


const fins = mongoose.model('fins', product_schema);

module.exports = fins