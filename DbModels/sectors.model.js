const mongoose = require('mongoose'); 

const Schema = mongoose.Schema
var sectorSchema = new Schema({
    ar_name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    en_name:{
        type:String,
        default:''
    },
    sector_id:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    products:{
        type:[{type:Schema.ObjectId, ref:'fins'}],
        default:[]
    }
});

//Export the model
module.exports = mongoose.model('sector', sectorSchema);

//db.fins.aggregate([ {$match:{main_biller:/مياه/}},{$addFields:{sector:"water"}} ])