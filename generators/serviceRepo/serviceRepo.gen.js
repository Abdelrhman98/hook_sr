
//? require data exectractors
const {
    getVersionByName 
} = require('../../DB/dataExtractors/version.exec')
const {
    getAllProductsForServiceRepo
} = require('../../DB/dataExtractors/products.exec')

const { writeJson , readdirAndCheckGiven } = require("../../helpers/files/file")

const path = require('path')
const fs    = require('fs')
class serviceRepoGenerator{
    serviceRepoBasePath = "generators/serviceRepo"
    generatedFileName   =  "serviceRepo"
    serviceRepoSample   = {}
    constructor(){
        
        this.serviceRepoSample = {
            "serviceRepoVersion":0,
            "data":[]
        }

        this.serviceRepoBasePath = "generators/serviceRepo"
        //console.log(this.serviceRepoSample)
    }

    generateServiceRepo(){
        getAllProductsForServiceRepo().then((products)=>{
            this.serviceRepoSample.data=[...products]
            this.getVesion()
            this.writeServiceRepo()
            //console.log(this.serviceRepoSample)
        })
    }

    async getVesion(){
        await getVersionByName("serviceRepo").then((data)=>{
            this.serviceRepoSample.serviceRepoVersion = data[0].version
            
        })
        return this.serviceRepoSample.serviceRepoVersion    
    }

    async checkServiceRepoVersionWithCurrent(){
        var lastVersion = await this.getVesion()
        var expectedVersion = (this.generatedFileName+lastVersion+".json")
        return readdirAndCheckGiven(this.serviceRepoBasePath,expectedVersion )
    }

    async writeServiceRepo(forceCreate = false){
        if(!(await this.checkServiceRepoVersionWithCurrent())){
            console.log("writed")
            writeJson(path.resolve(`generators/serviceRepo/serviceRepo${await this.getVesion()}.json`),this.serviceRepoSample)
        }else{
            console.log("not writed")
        }
        
        
    }
}

module.exports = serviceRepoGenerator

