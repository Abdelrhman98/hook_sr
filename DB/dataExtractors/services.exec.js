const serviceId = require('../models/services.model')

async function  test(){
    try{
        return serviceId.aggregate()
            .lookup({ from: 'mainbillers', localField: "main_biller", foreignField: 'biller_name', as: 'bill' })
            .lookup({ from: 'sectors', localField: "sector", foreignField: 'ar_name', as: 'sec' })
            .lookup({ from: 'providers', localField: "provider_id", foreignField: 'providerId', as: 'prov' })
            .addFields( { "provider_name": "$prov.name"  })
            .project('-_id provider_name ser_id ar_name en_name provider_id main_biller   ')
            .sort({ar_name:1}).exec()
    }catch(e){
        console.log(e)
    }
}


function getProductsWithIds(ids=[])
{
    //return serviceId.find({ser_id:{$in:ids}}).exec()
    return  serviceId.aggregate([
        { $match:   {ser_id:{$in:ids }  }},
        { $project: {
                        _id:0,
                        ser_id: 1, 
                        ar_name: 1, 
                        main_biller: 1, 
                        en_name:1, 
                        description:1, 
                        data_fields:1,
                        provider_id:1,
                        amount:1,
                        service_charge:1,
                        requests:1
                    } 
        }
    ]).exec()
}

async function getProductsByIdsWithSchema(ids=[], schema){
    var pipes = []
    matchFilter = (ids.length)?pipes.push({ $match:   {ser_id:{$in:ids }  }}):{}
    pipes.push({ $project: schema })
    return await serviceId.aggregate(pipes).exec()
}


function getAllProductsForServiceRepo(){
    return serviceId.find({}).exec()
}


function addNewProductToServiceRepo( product ){
    const newProduct = serviceId(product)
    return newProduct.save()

}

async function getLastServiceId(){
    return await serviceId.find().sort({'ser_id':-1}).limit(1).exec()
}

async function getServiceById(service_id){
    return await serviceId.findOne({ser_id : service_id}).exec()
}

async function updateProductById( productId, product ){
    return await serviceId.findOneAndUpdate({ser_id:productId},{$set:product}).exec()
}

module.exports = {
    test,
    getProductsWithIds,
    getAllProductsForServiceRepo,
    getLastServiceId,
    addNewProductToServiceRepo,
    getServiceById,
    updateProductById,
    getProductsByIdsWithSchema
}