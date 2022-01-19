const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var versioningSchema = new mongoose.Schema({
    versionFor:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    version:{
        type:String,
        required:true,
        default:"1.0"
    }
});

//Export the model
module.exports = mongoose.model('versioning', versioningSchema);