const mongoose = require('mongoose')
const services = require('../../DB/dataExtractors/services.exec')
try{
    mongoose.connect("mongodb://localhost:27017/serviceRepo_UAT",()=>{
        console.log("connected to database mongodb://localhost:27017/serviceRepo_UAT")
    })
}catch(err){
    if(err)
        console.log(err)
}
// const {writeJson} = require('./helpers/files/file.js')

const serviceRepo = require('../../service_repo_uat.json')
const mapper = require('../../mainBillersMapper.json')
// let mapper = {}
serviceRepo.data.forEach(data=>{
    data.main_biller = mapper[data.ser_id] ||data.main_biller
    services.addNewProductToServiceRepo(data)
    // mapper[data.ser_id] = data.main_biller
})
// writeJson('mainBillersMapper.json',mapper )

// serviceRepo.data.forEach(data=>{

// })