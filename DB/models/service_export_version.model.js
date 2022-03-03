const mongoose = require('mongoose');

var versionObject = new mongoose.Schema({
    released_version:{
        type:String,
        default:"1.0"
    },
    isWorking:{
        type:Boolean,
        default:false
    },
    created_at:{
        type: Date,
        default:Date.now()
    },
    updated_at:{
        type:Date
    }
});

var service_export_version = new mongoose.Schema({
    ser_id:{
        type:Number,
        required:true,
        unique:true,
        index:true,
    },versions:{

    }
});

//Export the model
module.exports = mongoose.model('User', userSchema);