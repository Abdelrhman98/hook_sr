const productModel = require('../models/services.model')

function getProductsWithIds(ids=[])
{
    //return productModel.find({ser_id:{$in:ids}}).exec()
    return  productModel.aggregate([
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
    return await productModel.aggregate([
        { $match:   {ser_id:{$in:ids }  }},
        { $project: schema }
    ]).exec()
}


function getAllProductsForServiceRepo(){
    return productModel.find({}).exec()
}


function addNewProductToServiceRepo( product ){
    const newProduct = productModel(product)
    return newProduct.save()

}

async function getLastServiceId(){
    return await productModel.find().sort({'ser_id':-1}).limit(1).exec()
}

async function getServiceById(service_id){
    return await productModel.findOne({ser_id : service_id}).exec()
}

async function updateProductById( productId, product ){
    return await productModel.findOneAndUpdate({ser_id:productId},{$set:product}).exec()
}

module.exports = {
    getProductsWithIds,
    getAllProductsForServiceRepo,
    getLastServiceId,
    addNewProductToServiceRepo,
    getServiceById,
    updateProductById,
    getProductsByIdsWithSchema
}



/* //todo db.fins.aggregate([
    { $match:   {ser_id:{$in:[1,2] }  }},
    { $project: {_id:0,ser_id: 1, ar_name: 1, main_biller: 1} }
])

*/