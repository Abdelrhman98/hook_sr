const {
    getVersionByName 
} = require('../../DB/dataExtractors/version.exec')

/**
 * ? parent class for all generators+
 * 
 */
class generator {
    constructor( generatorConfigs ){
        this.versionFor             = generatorConfigs.versionFor
        this.generatedFileName      = generatorConfigs.generatedFileName
        this.generatorBasePath      = generatorConfigs.generatorBasePath
        this.generatorDataSample    = generatorConfigs.sample || {}
    }

    generator_logic(){}

    async getVersion(){
        return  getVersionByName(this.versionFor).then((data)=>{
            return data[0].version
        })
    }

    async _get_expected_generator_file_name_latest(){
        return `${this.generatedFileName}${await this.getVersion()}.json`
    }
}

module.exports = generator