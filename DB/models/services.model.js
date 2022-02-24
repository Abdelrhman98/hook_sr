const mongoose = require('mongoose'); 
const { hook_addProductToSector } = require('./hooks/sector.hooks')
const { hook_updateVersionForServiceRepo } = require('./hooks/version.hooks')
const { deletePropertyPath } = require('../../helpers/objArray.help')
// Declare the Schema of the Mongo model
var service_schema = new mongoose.Schema({
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
    },isNew:{
        type:Number,
        default:0
    },
    isWorking:{
        type:Boolean
    }
},{
    strict: false
});



async function hook_generateSerIdBasedOnLastService(){
    //console.log(this)
    let last_id = await service.find().sort({'ser_id':-1}).limit(1).exec()
    this.ser_id = last_id[0].ser_id + 1
    //return 
}

service_schema.pre("save", async function(next){
    if(this.isNew){
        await hook_generateSerIdBasedOnLastService.bind(this)()
    }
    next()
})

service_schema.post('findOneAndUpdate', async function(){
    hook_updateVersionForServiceRepo()
})


service_schema.post('save', async function(){
    hook_addProductToSector.bind(this)()
    hook_updateVersionForServiceRepo()
})

service_schema.methods.removeKeys = function (wantToRemove){
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



const service = mongoose.model('service', service_schema);

module.exports = service