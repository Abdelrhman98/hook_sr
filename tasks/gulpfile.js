const mongoose = require('mongoose')
const seedServices = require('./seedingTasks/seedServices/index')
const seedVersion = require('./seedingTasks/seedingVersions/index')
require('dotenv').config()
const { series } = require('gulp');

try{
    mongoose.connect("mongodb://localhost:27017/serviceRepo_test",()=>{
        console.log("asssssssssssssssss",process.env.ENV)
        console.log("connected to database  mongodb://localhost:27017/serviceRepo")
    })
}catch(err){
    if(err)
        console.log(err)
}

function test(){
    console.log("good")
}
exports.seedServices = seedServices
exports.seedVersions = seedVersion

exports.default = test