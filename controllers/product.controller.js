const {
    addNewProductToServiceRepo,
    getServiceById,
    updateProductById
} = require('../DB/dataExtractors/products.exec')

function addNewProduct( product ){
    return addNewProductToServiceRepo(product).then((doc)=>{
        return doc
    })
}

function getService(product_id){
    return getServiceById(product_id).then((doc)=>{
        if(doc)
            return doc
        return `service not found ${product_id}`
    })
}

async function updateProduct( productId, product ){
    return await updateProductById( productId, product)
}
module.exports ={
    addNewProduct,
    getService,
    updateProduct
}