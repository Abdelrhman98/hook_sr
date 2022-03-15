const mongoose = require("mongoose")
const {MongoUri} = require('../DB/DBCredentials/mongoConnection')

try{
    mongoose.connect(MongoUri,
        {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        },()=>{
        console.log("connected to database ", MongoUri)
    })
}catch(err){
    if(err)
        console.log(err)
}

//console.log(MongoUri)
