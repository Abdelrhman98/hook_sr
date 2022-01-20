module.exports = {
    local:{
        MongoUri:"mongodb://damenBillPayment:dbp2021@10.29.41.22:27017/serviceRepo?authSource=admin&readPreference=primary&ssl=false"
    }
}[process.env.NODE_ENV || 'local']