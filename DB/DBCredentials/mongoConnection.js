module.exports = {
    dev:{
        MongoUri:"mongodb://damenBillPayment:dbp2021@10.29.41.22:27017/serviceRepo?authSource=admin&readPreference=primary&ssl=false"
    },
    local:{
        MongoUri:"mongodb://localhost:27017/serviceRepo"
    }
}[process.env.ENV || 'local']