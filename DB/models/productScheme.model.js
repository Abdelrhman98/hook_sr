const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
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
    }
});

//Export the model
module.exports = mongoose.model('productScheme', productScheme);