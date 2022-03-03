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
    },
    successRecipt:{
        type: Number
    },
    transaction_type:{
        type: Number
    },
    notAvailable:{
        type:Boolean
    },
    failureReceipt:{
        type:Object
    },store:{
        type:Boolean
    }
},{
    strict: false
});



async function hook_generateSerIdBasedOnLastService(){
    //console.log(this)
    let last_id = await fins.find().sort({'ser_id':-1}).limit(1).exec()
    this.ser_id = last_id[0].ser_id + 1
    //return 
}

product_schema.pre("save", async function(next){
    await hook_generateSerIdBasedOnLastService.bind(this)()
    // if(this.isNew){
        
    // }
    next()
})

product_schema.post('findOneAndUpdate', async function(){
    hook_updateVersionForServiceRepo()
})


product_schema.post('save', async function(){
    hook_addProductToSector.bind(this)()
    hook_updateVersionForServiceRepo()
})

product_schema.methods.removeKeys = function (wantToRemove){
    wantToRemove.forEach(key=>{
        deletePropertyPath(this, key)    
    })
    
    return this
    // const arr= wantToRemove.split('.')
    // console.log(arr);
    // let copyData = this
    // delete copyData[arr[0]][arr[1]]
    // return copyData
}

const fins = mongoose.model('fins', product_schema);

module.exports = fins