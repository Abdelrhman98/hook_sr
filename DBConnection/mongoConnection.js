module.exports = {
    local:{
        MongoUri:"mongodb://localhost:27017/serviceRepo"
    }
}[process.env.NODE_ENV || 'local']