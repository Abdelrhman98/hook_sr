const mongoose = require('mongoose'); // Erase if already required


var main_biller = new mongoose.Schema({
    biller_name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    biller_id:{
        type:Number,
        required:true,
        unique:true,
    },
    sector_id:{
        type:Number,
    }
});

//Export the model
module.exports = mongoose.model('MainBiller', main_biller);