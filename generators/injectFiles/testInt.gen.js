const generator = require('../interface/generator')
const {
    getAllProductsForServiceRepo
} = require('../../DB/dataExtractors/services.exec')


class serviceRepoGenerator extends generator{

    constructor(){
        super({
            versionFor:"serviceRepo",
            generatedFileName: "serviceRepo",
            generatorBasePath: __dirname,
            sample:{},
            oldDir: "/oldVersions"
        })
        
    }

    async cacheAll(){
        return getAllProductsForServiceRepo().then(async(products)=>{
            this.sample.data    = [...products]
            this.sample.version = await this.getVersion()
        })
    }

    async generator_logic(forceCreate = false){
        var safe = false
        var responseObject = 
            {   "type":"",
                "serviceRepo":await this._get_expected_generator_file_name_latest(),
                "serviceRepoPath":await this._get_full_generator_path(),
            }
        if(!(await this.checkGeneratorVersionWithCurrent()) || forceCreate){
            // read_MONGO -> archive -> generate
            this.archiveToOldVersions()
            safe = await this.writeLatestGenerator()
            responseObject.type = "Generated"
        }else{
            safe = true
            responseObject.type = "Cached"
        }
        if(safe == true)
            return responseObject
    }

}

module.exports = serviceRepoGenerator