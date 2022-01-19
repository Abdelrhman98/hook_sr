const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var providerSchema = new mongoose.Schema({
    providerId:{
        type:Number,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    service:{
        type:String,
        default:''
    },
    powered_by:{
        type:String,
    },
    filePath:{
        type:String,
        default:''
    }
});

// providerSchema.virtual("powered_by_test").get(function(){
//     return "Powered By "+this.provider_name
// })

//Export the model
module.exports = mongoose.model('providers', providerSchema);