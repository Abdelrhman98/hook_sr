const {
    getVersionByName 
} = require('../../DB/dataExtractors/version.exec')

const {
    getDateYMDHM
} = require('../../helpers/date/date')

const path = require('path')
const { 
    writeJson, 
    readdirAndCheckGiven, 
    moveFileToGivenPath,
    getPathFilesList,
    getFileExtension,
    ensuerPath
} = require("../../helpers/files/file")

// const path = require('path')
/**
 * ? parent class for all generators+
    {    
        "versionFor":"",
        "generatedFileName":"",
        "generatorBasePath":__dirname,
        "sample":{},
        "oldDir":"/path"
    }
 */
class generator {
    constructor( generatorConfigs ){
        this.base                   = generatorConfigs.base
        this.versionFor             = generatorConfigs.versionFor
        this.generatedFileName      = generatorConfigs.generatedFileName + '_'
        this.generatorBasePath      = generatorConfigs.generatorBasePath
        this.generatorDataSample    = generatorConfigs.sample || {}
        this.oldVersionsDir         = path.resolve(this.generatorBasePath+generatorConfigs.oldDir)
        // console.log(this.oldVersionsDir)
    }

    generator_logic(){}

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> get all data from Model based on logic
    //!return value -> object {model data}
    /* ------------------------------------------------------------------------------------------------------------- */
    cacheAll(){}

    async getVersion(){
        return  getVersionByName(this.versionFor).then((data)=>{
            return data[0].version
        })
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> return expected latest service repo name with version
    //? for checking only
    //!return value -> serviceRepoXX.XX.json
    /* ------------------------------------------------------------------------------------------------------------- */
    async _get_expected_generator_file_name_latest(){
        return `${this.generatedFileName}${await this.getVersion()}.json`
    }

    async writeGenerator(){
        // if(!generatorData)
        //     await this.cacheAll()
        // console.log("writtttttttt",await this._get_full_generator_path(),"end")
        return await writeJson(await this._get_full_generator_path() , this.generatorDataSample)
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> return full latest service repo path <expected>
    //!return value -> _path_/generators/serviceRepo/serviceRepoXX.XX.json
    /* ------------------------------------------------------------------------------------------------------------- */
    async _get_full_generator_path(){
        return `${this.generatorBasePath}/${await this._get_expected_generator_file_name_latest()}`
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> get last generated serviceRepo and check with latest version form mongoDB <Versions collection>
    //? search in given path if found SR with serviceRepoXX.XX.json
    //!return Boolean <T, F>
    /* ------------------------------------------------------------------------------------------------------------- */
    async checkGeneratorVersionWithCurrent(){
        var expectedGeneratorFileName = await this._get_expected_generator_file_name_latest()
        return readdirAndCheckGiven(this.generatorBasePath,expectedGeneratorFileName )
    }

    /* ------------------------------------------------------------------------------------------------------------- */
    // todo=> move all service repos to old versions where files not equal latest version
    //? for archiving old versions
    //!return 
    /* ------------------------------------------------------------------------------------------------------------- */
    async archiveToOldVersions(){
        var dirs = getPathFilesList(this.generatorBasePath)
        const latestGenerator = await this._get_expected_generator_file_name_latest()
        dirs.forEach( file => {
            let extension = getFileExtension(file)
            // console.log("TTTTTTTTTTTT", file.substr(0,file.lastIndexOf('_')) , this.generatedFileName)
            if(extension == '.json' && latestGenerator != file && file.substr(0,file.lastIndexOf('_')+1) === this.generatedFileName ){
                console.log("movedfile", latestGenerator, file)
                moveFileToGivenPath(
                    path.resolve(this.generatorBasePath+'/'+file), 
                    path.resolve(this.oldVersionsDir+'/'+getDateYMDHM()+'_'+file))
            }
        })
    }

    async writeLatestGenerator(){
        await this.cacheAll()
        return await this.writeGenerator.bind(this)()
    }
}

module.exports = generator