const productModel = require('../models/product.model')

function getProductsWithIds(ids=[])
{
    //return productModel.find({ser_id:{$in:ids}}).exec()
    return productModel.aggregate([
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

function getAllProductsForServiceRepo(){
    return productModel.find({},
        {
            _id:0,
            ser_id: 1, 
            ar_name: 1, 
            main_biller: 1, 
            en_name:1,
            sp_config:1,
            description:1, 
            data_fields:1,
            provider_id:1,
            amount:1,
            service_charge:1,
            requests:1,
            receipt:1

        }).exec()
}

module.exports = {
    getProductsWithIds,
    getAllProductsForServiceRepo
}

/* //todo db.fins.aggregate([
    { $match:   {ser_id:{$in:[1,2] }  }},
    { $project: {_id:0,ser_id: 1, ar_name: 1, main_biller: 1} }
])

*/