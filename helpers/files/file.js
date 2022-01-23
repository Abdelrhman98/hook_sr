const fs    = require('fs')
const path  = require('path')
const fse   = require('fs-extra')
const res = require('express/lib/response')
function writeJsonToFile( file, json ){
    fs.writeFile(file, JSON.stringify(json),(err)=>{
        if(err)
            return err
    })
    return true;
}

function readdirAndCheckGiven( givenDir, expected ){
    return new Promise((resolve, reject)=>{
        var dirs = fs.readdirSync(path.resolve(givenDir))
        dirs.forEach(file=>{
            if(file == expected)
                resolve(true)
        })
        resolve(false)
    })
}

function moveFileToGivenPath( CurrentPath, targetPath ){
    
    return new Promise((resolve, reject)=>{
        fse.move(resolvePath(CurrentPath), resolvePath(targetPath),(err)=>{
            if(err) {
                console.log(err)
                reject(err)
            }
                resolve(true)
        })
        resolve(false)
    })
}

//@@Private
function getFileExtension( file ){
    return file.substring(file.lastIndexOf('.'))
}

function resolvePath( dir ){
    return path.resolve(dir)
}

function getPathFilesList( givenDir ){
        var dirs = fs.readdirSync(path.resolve(givenDir))
        return dirs;
}

function pathIsExistes( path ){

    return fs.promises.access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

module.exports = {
    writeJson:writeJsonToFile,
    readdirAndCheckGiven:readdirAndCheckGiven,
    moveFileToGivenPath:moveFileToGivenPath,
    getPathFilesList:getPathFilesList,
    getFileExtension:getFileExtension,
    resolvePath:resolvePath,
    pathIsExistes:pathIsExistes
}