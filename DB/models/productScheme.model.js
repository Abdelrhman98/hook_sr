const mongoose = require('mongoose'); // Erase if already required

var productScheme = new mongoose.Schema({
    schemeFor:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    scheme:{
        type:Object,
        default:{},
        required:true
    },
    schemeType:{
        type:String,
        enum: ['with_scheme', 'without_scheme'],
        default:"with_scheme"// withoutScheme
    },sub_keys:{
        type:Array,
        default:[]
    }
    // ,joins:{
    //     type:joinsSchema
    // }
});

//Export the model
module.exports = mongoose.model('productScheme', productScheme);