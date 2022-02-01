const {
    addNewProductToServiceRepo
} = require('../DB/dataExtractors/products.exec')

function addNewProduct( product ){
    addNewProductToServiceRepo(product).then((doc)=>{
        // console.log(doc)
    })
    
}

module.exports ={addNewProduct}