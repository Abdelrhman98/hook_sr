const { string } = require('joi');
const mongoose = require('mongoose'); 

var versionHistory = new mongoose.Schema({
    ser_id:{
        type:Number,
        required:true,
        index:true
    },
    version:{
        type:String,
        required:true,
    },
    service:{
        type:Object,
        required:true,
    },
    created_at:{
        type: Date,
        default:Date.now()
    }
},{strict:false});


const versionHistory = mongoose.model('version_Histroy', versionHistory);
module.exports = versionHistory