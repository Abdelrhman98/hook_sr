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

const serviceModel = require('../DB/models/services.model')
const serv = require('../DB/models/product.model')
const final  = require('./final.json')
const news = require('./new.json')

// console.log()

// news.forEach(ele=>{
//     const x = serviceModel(ele)
//     x.save()
// })


// serv.aggregate().match({ser_id:84}).lookup(
//     { from: 'mainbillers', localField: "main_biller", foreignField: 'biller_name', as: 'sec' }
// ).exec().then(data=>{
//     console.log(data[0])
// })


serv.updateMany({provider_id:3},{"$set":{isWorking:false}}).exec()