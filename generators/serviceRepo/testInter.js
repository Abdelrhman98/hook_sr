const serviceRepo = require('./serviceRepoINH.gen')
const mongoose = require('mongoose')
try{
    mongoose.connect("mongodb://localhost:27017/serviceRepo",()=>{
        console.log("connected to database mongodb://localhost:27017/serviceRepo")
    })
}catch(err){
    if(err)
        console.log(err)
}
let inter = new serviceRepo("uat")
var main = async()=>{
    console.log(await inter.generator_logic())
}
main()