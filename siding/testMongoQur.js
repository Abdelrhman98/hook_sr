const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
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
    const test = await productModel.find({ser_id:82}).select('-_id ar_name en_name sp_config data_fields').exec();
    test.forEach(ele=>{
        console.log(ele.findProductsInSameDepartment('data_fields.mobile')); 
    })
    // console.log(test.findProductsInSameDepartment());
}

getTest()




