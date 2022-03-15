const mongoose = require('mongoose')
const seedServices = require('./seedingTasks/seedServices/index')
const seedVersion = require('./seedingTasks/seedingVersions/index')
const exportServices = require('./export/services/index')
const exportDatabase = require('./export/allCollections/index')
require('dotenv').config()
const { series } = require('gulp');
var conn = null
try{
    conn = mongoose.connect("mongodb://localhost:27017/serviceRepo")
}catch(err){
    if(err)
        console.log(err)
}

function close (cb){
    conn.disconnect()
    // conn=null
    // console.log(typeof conn)
    cb()
}
exports.seedServices = seedServices
exports.seedVersions = seedVersion
exports.exportServices = exportServices
exports.exportAll  = series(exportDatabase, close)
exports.default = close