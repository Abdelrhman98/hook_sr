const billerModel = require('../models/main_biller.model')

async function isBillerExist( biller_name ){
    const biller = await billerModel.findOne({ biller_name : biller_name }).exec()
}
async function getAllBillersName(){
    const billerNames =  billerModel.find()
}