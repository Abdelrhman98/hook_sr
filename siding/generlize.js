const latest = require('../latest.json')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/serviceRepo', {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

const newProducts = require('../DB/models/productBackup.model')
let counter = 0
let keyss = {}
latest.data.forEach( async (ele) =>{
    // const coll = await productModel.findOne({ser_id : ele.ser_id}).exec()
    Object.keys(ele).forEach(ll =>{
        keyss[ll] = ele[ll]
    })
    // console.log(ele)
})

console.log(keyss)
