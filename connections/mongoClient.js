const mongoose = require("mongoose")
const {MongoUri} = require('../DB/DBCredentials/mongoConnection')
const mongoCon = require('../DB/mongoDB')

try{
    mongoCon.initialize(MongoUri)
    // mongoose.connect(MongoUri,()=>{
    //     console.log("connected to database ", MongoUri)
    // })
}catch(err){
    if(err)
        console.log(err)
}

//console.log(MongoUri)
