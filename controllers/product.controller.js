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
    const updatedProduct = await updateProductById( productId, product)
    if(updatedProduct){
        return updatedProduct
    }else{
        return "service Id not fount"
    }
}
module.exports ={
    addNewProduct,
    getService,
    updateProduct
}