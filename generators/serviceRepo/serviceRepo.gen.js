
//? require data exectractors
const {
    getVersionByName 
} = require('../../DB/dataExtractors/version.exec')
const {
    getAllProductsForServiceRepo
} = require('../../DB/dataExtractors/products.exec')

const fse = require('fs-extra')
const { 
    writeJson, 
    readdirAndCheckGiven, 
    moveFileToGivenPath,
    getPathFilesList,
    getFileExtension,
    ensuerPath
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
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> this function apply steps < archive - generate - change serviceRepoSample >
    /* ------------------------------------------------------------------------------------------------------------- */
    async generator_logic(forceCreate = false){
        var safe = false
        var responseObject = 
            {   "type":"",
                "serviceRepo":await this._get_expected_service_repo_file_name_latest(),
                "serviceRepoPath":await this._get_full_service_repo_path(),
            }
        if(!(await this.checkServiceRepoVersionWithCurrent()) || forceCreate){
            // read_MONGO -> archive -> generate
            this.archiveToOldVersions()
            safe = await this.writeLatestServiceRepo()
            responseObject.type = "Generated"
        }else{
            safe = true
            //!XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            responseObject.type = "Cached"
            // return current <latest>
        }
        if(safe == true){
            console.log("SSSSSSSSSSSSSSSSSSS")
            return responseObject
        }
        
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> read all product and save it in serviceRepoSample
    //? search in given path if found SR with serviceRepoXX.XX.json
    //!return Boolean <T, F>
    /* ------------------------------------------------------------------------------------------------------------- */
    cacheAllProducts(){
        return getAllProductsForServiceRepo().then((products)=>{
            this.serviceRepoSample.data=[...products]
            this.getVersion()
        })
    }

    async getVersion(){
        await getVersionByName("serviceRepo").then((data)=>{
            this.serviceRepoSample.serviceRepoVersion = data[0].version
        })
        return this.serviceRepoSample.serviceRepoVersion
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> get last generated serviceRepo and check with latest version form mongoDB <Versions collection>
    //? search in given path if found SR with serviceRepoXX.XX.json
    //!return Boolean <T, F>
    /* ------------------------------------------------------------------------------------------------------------- */
    async checkServiceRepoVersionWithCurrent(){
        var expectedServiceRepFileName = await this._get_expected_service_repo_file_name_latest()
        return readdirAndCheckGiven(this.serviceRepoBasePath,expectedServiceRepFileName )
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> move all service repos to old versions where files not equal latest version
    //? for archiving old versions
    //!return 
    /* ------------------------------------------------------------------------------------------------------------- */
    async archiveToOldVersions(){
        var dirs = getPathFilesList(this.serviceRepoBasePath)
        const latestServiceRepo = await this._get_expected_service_repo_file_name_latest()
        dirs.forEach( file => {
            let extension = getFileExtension(file)
            if(extension == '.json' && latestServiceRepo != file){
                console.log("movedfile", latestServiceRepo, file)
                moveFileToGivenPath(path.resolve(this.serviceRepoBasePath+'/'+file), path.resolve(this.oldVersionsDir+'/'+file))
            }
        })
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    //!XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    // todo=> get last version in mongo and read files in serviceRepo dir and chcek last file generated if it
    // ! (true) already generated - do nothing
    // ! (false) move old serviceRepo to oldVersions path then create new with last version
    //? params forceCreate -> for forece generating evenIf generated file is last version
    //! enhance => adding force run
    /* ------------------------------------------------------------------------------------------------------------- */
    async writeServiceRepo(serviceRepo = this.serviceRepoSample){
        if(serviceRepo.data == [])
            await this.cacheAllProducts()
        console.log(this.serviceRepoSample.data.length)
        return await writeJson(await this._get_full_service_repo_path() ,this.serviceRepoSample)
    }

    async writeLatestServiceRepo(){
        await this.cacheAllProducts()
        return await this.writeServiceRepo()
    }

    async getLatestServiceRepoPath(){
        const serviceRepo = await this._get_full_service_repo_path()
        if(ensuerPath(serviceRepo)){
            return serviceRepo
        }else{
            this.writeServiceRepo(true)
            if(ensuerPath(serviceRepo)){
                return serviceRepo
            }else{
                return "err"
            }
        }
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> return full latest service repo path <expected>
    //!return value -> _path_/generators/serviceRepo/serviceRepoXX.XX.json
    /* ------------------------------------------------------------------------------------------------------------- */
    async _get_full_service_repo_path(){
        return path.resolve(`./${this.serviceRepoBasePath}/${await this._get_expected_service_repo_file_name_latest()}`)
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> return expected latest service repo name with version
    //? for checking only
    //!return value -> serviceRepoXX.XX.json
    /* ------------------------------------------------------------------------------------------------------------- */
    async _get_expected_service_repo_file_name_latest(){
        return `${this.generatedFileName}${await this.getVersion()}.json`
    }
}

module.exports = serviceRepoGenerator

