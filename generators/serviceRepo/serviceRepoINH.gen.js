const generator = require('../interface/generator')

const ser_gen_logic = require('./SR_GEN_logic.json')
const cacheLogic = require('./cacheMethod.logic')

class serviceRepoGenerator extends generator{

    constructor(env = "prod"){
        let generatorEnv = ser_gen_logic[env]
        super({
            versionFor: generatorEnv["versionFor"],
            generatedFileName: generatorEnv["generatedFileName"],
            generatorBasePath: __dirname,
            sample:{},
            oldDir: generatorEnv["oldDir"]
        })
        this.cacheLogicFunc = generatorEnv["cacheMethodName"]
    }

    async cacheAll(){
        cacheLogic[this.cacheLogicFunc].then(async(products)=>{
            this.generatorDataSample["data"]    = [...products]
            this.generatorDataSample["version"] = await this.getVersion()
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

    async test(){
        return await this.getVersion()
    }
}

module.exports = serviceRepoGenerator