const injector  =require("./inject.json")
const mongoose = require('mongoose');
const serviceModel = require('../../DB/dataExtractors/services.exec')
mongoose.Promise = global.Promise;
const {
    getVersionByName 
} = require('../../DB/dataExtractors/version.exec');
const { makeDirSync } = require("fs-extra/lib/mkdirs/make-dir");
// Connect MongoDB at default port 27017.

async function updateProductById( productId, product ){
    return await serviceId.findOneAndUpdate({ser_id:productId},{$set:product}).exec()
}
mongoose.connect('mongodb://localhost:27017/serviceRepo', {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

// Object.keys(injector).forEach(ele=>{
//     serviceModel.updateProductById(ele,Object.assign({},injector[ele]))
//     // console.log(ele)
// })

let getVersion = ()=>{
    return getVersionByName("serviceRepo").then(data=>{
        return data
    })
}

main = async()=>{
    console.log(`test ${await getVersion()}`)
}
main()
