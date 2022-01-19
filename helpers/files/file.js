const fs = require('fs')
const path = require('path')
function writeJsonToFile(file, json){
    fs.writeFile(file, JSON.stringify(json),(err)=>{
        if(err)
            return err
    })
    return true;
}

function readdirAndCheckGiven( givenDir , expected ){
    return new Promise((resolve, reject)=>{
        var dirs = fs.readdirSync(path.resolve(givenDir))
        dirs.forEach(file=>{
            if(file == expected)
                resolve(true)
        })
        resolve(false)
    })
}

module.exports = {
    writeJson:writeJsonToFile,
    readdirAndCheckGiven:readdirAndCheckGiven
}