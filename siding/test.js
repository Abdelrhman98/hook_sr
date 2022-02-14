const mongoose = require('mongoose');
const axios =require('axios')
mongoose.Promise = global.Promise;

const {writeJson} = require('../helpers/files/file')
const productModel = require('../DB/models/product.model')
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
var getTest = async()=>{
    const test = await productModel.find({ser_id:10}).exec();
    test.forEach(ele=>{
        // console.log(ele)
        console.log(ele.removeKeys(['service_charge.slides', 'service_charge.field_name']));
    })
    // console.log(test.findProductsInSameDepartment());
}


var getWE= async()=>{
    const test = await productModel.find({main_biller:{ $in: [/ويي/, /تصالات/] }}).select('-_id ser_id').exec();
    var red = []
    test.forEach((ele)=>{
        red.push( ele.ser_id)
    })
    axios.post('http://localhost:3000/aggregator/serviceList',{"services":red}).then(data=>{
        writeJson('./aggregatorServiceList.json', data.data.serviceList)
        
    })
    
    // console.log(red)
}
getWE()

