
//? require data exectractors
const {
    getVersionByName 
} = require('../../DB/dataExtractors/version.exec')
const {
    getAllProductsForServiceRepo
} = require('../../DB/dataExtractors/products.exec')

class serviceRepoGenerator{
    serviceRepoSample = {}
    constructor(){
        
        this.serviceRepoSample = {
            "serviceRepoVersion":0,
            "data":[]
        }
        //console.log(this.serviceRepoSample)
    }

    generateServiceRepo(){
        getAllProductsForServiceRepo().then((products)=>{
            console.log(products)
        })
        this.getVesion()

    }
    async getVesion(){
        await getVersionByName("serviceRepo").then((data)=>{
            this.serviceRepoSample.serviceRepoVersion = data[0].version
            
        })
        return this.serviceRepoSample.serviceRepoVersion    
    }
    
}

module.exports = serviceRepoGenerator

