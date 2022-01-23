
//? require data exectractors
const {
    getVersionByName 
} = require('../../DB/dataExtractors/version.exec')
const {
    getAllProductsForServiceRepo
} = require('../../DB/dataExtractors/products.exec')

const { 
    writeJson, 
    readdirAndCheckGiven, 
    moveFileToGivenPath,
    getPathFilesList,
    getFileExtension,
    pathIsExistes
} = require("../../helpers/files/file")

const path = require('path')



class serviceRepoGenerator{
    serviceRepoBasePath = "generators/serviceRepo/"
    generatedFileName   = "serviceRepo"
    oldVersionsDir      = this.serviceRepoBasePath+"oldVersions"
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

    async archiveToOldVersions(){
        var dirs = getPathFilesList(this.serviceRepoBasePath)
        dirs.forEach( file => {
            let extension = getFileExtension(file)
            if(extension == '.json'){ 
                moveFileToGivenPath(this.serviceRepoBasePath+file, this.oldVersionsDir)
            }
        })
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> get last version in mongo and read files in serviceRepo dir and chcek last file generated if it
    // ! (true) already generated - do nothing
    // ! (false) move old serviceRepo to oldVersions path then create new with last version
    //? params forceCreate -> for forece generating evenIf generated file is last version
    //! enhance => adding force run
    /* ------------------------------------------------------------------------------------------------------------- */
    async writeServiceRepo(forceCreate = false){
        if(!(await this.checkServiceRepoVersionWithCurrent())){
            this.archiveToOldVersions()
            writeJson(path.resolve(`${this.serviceRepoBasePath}/${this.generatedFileName}${await this.getVesion()}.json`),this.serviceRepoSample)
        }else{
            console.log("not writed")
        }
    }

    async getLatestServiceRepoPath(){
        const latestVersion = await this.getVesion()
        const serviceRepo = this.generatedFileName + latestVersion + '.json'
        const result = await pathIsExistes('./test/')
        console.log(result)
        //res.send(result)
    }
}

module.exports = serviceRepoGenerator

