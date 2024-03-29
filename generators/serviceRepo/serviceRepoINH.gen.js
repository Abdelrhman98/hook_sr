const generator = require('../interface/generator')

const ser_gen_logic = require('./configs/SR_GEN_logic.json')
const cacheLogic = require('./configs/cacheMethod.logic')
var export_ENV = "prod"
class serviceRepoGenerator extends generator{

    constructor(env = "prod"){
        export_ENV = env
        var generatorEnv = ser_gen_logic[env]
        super({
            versionFor: generatorEnv["versionFor"],
            generatedFileName: generatorEnv["generatedFileName"],
            generatorBasePath: __dirname,
            sample:{},
            oldDir: generatorEnv["oldDir"]
        })
    }

    async cacheAll(){
        let executionFunction = ser_gen_logic[export_ENV]['cacheMethodName']
        return cacheLogic[executionFunction]().then(async(products)=>{
            this.generatorDataSample["version"] = await this.getVersion()
            this.generatorDataSample["data"]    = [...products]
            return {...this.generatorDataSample}
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
            safe = await this.writeLatestGenerator.bind(this)()
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