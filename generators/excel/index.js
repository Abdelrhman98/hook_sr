const excel = require('../excel/excel.generator')
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/serviceRepo', {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

const {test} = require('../../DB/dataExtractors/services.exec')


const configs = {
    sheetName:"serviceRepo",
    docName:"SR",
    header:{
    "ser_id":"number", 
    "provider_id":"number",
    "ar_name":"string",
    "en_name":"string",
    "main_biller":"string",
    "provider_name":"string"
    },
    date:"test"
}
let excelN = new excel(configs)
test().then(data=>{
    
    data.forEach(ele=>{
        ele["provider_name"] = ele["provider_name"][0]
    })
    console.log(data)
    excelN.addToFile(data,0)
    excelN.savefile()
})



