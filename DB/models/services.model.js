const mongoose = require('mongoose'); 
const serviceSchema = require('./schema_Interface/service.interface')

const { hook_addProductToSector }           = require('./hooks/sector.hooks')
const { hook_updateVersionForServiceRepo }  = require('./hooks/version.hooks')
const { deletePropertyPath }                = require('../../helpers/objArray.help')

var service_schema = new mongoose.Schema({
        ...serviceSchema,
        ser_id:{
            type:Number,
            unique:true,
            index:true
        },
        version:{
            type:Number,
            default:0
        },
        
    },{
    strict: false
});

async function hook_generateSerIdBasedOnLastService(){
    let last_id = await service.find().sort({'ser_id':-1}).limit(1).exec()
    this.ser_id = last_id[0].ser_id + 1
}

service_schema.pre("save", async function(next){
    if(this.isNew && process.env?.ENV !== 'test'){
        console.log("added_id")
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
}

const service   = mongoose.model('service', service_schema);

module.exports  = service