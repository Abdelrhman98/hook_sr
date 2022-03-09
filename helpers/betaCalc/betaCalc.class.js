module.exports = class betaCalc{

    constructor(baseObject, diffObject){
        this.baseObject = baseObject
        this.diffObject = diffObject
        this.diffMap = {}
    }

    mapify(object, objectName="default",str=""){
        if(typeof object != 'object'){
        let newKey = {}
        newKey[objectName] = object
            this.diffMap[str.substr(1)] = Object.assign(this.diffMap[str.substr(1)]||{},newKey) 
            return 
        }
        Object.keys(object).forEach(ele=>{
            this.mapify(object[ele],objectName,`${str}.${ele}`)
        })
    }

    mapifyAll(){
        this.mapify(this.baseObject,"base")
        this.mapify(this.diffObject, "diff")
        return this.diffMap
    }

    calcDiff(){
        let addedKeys = [],
        changedValues = {},
        removefKeys = []
        Object.keys(this.diffMap).forEach(baseKey =>{
            let keys = Object.keys(this.diffMap[baseKey])
            if(keys.length >= 2 && this.diffMap[baseKey][keys[0]] != this.diffMap[baseKey][keys[1]])
                changedValues[baseKey] = { from : this.diffMap[baseKey][keys[0]] , to : this.diffMap[baseKey][keys[1]]}  
            if( keys.length == 1 && keys[0] == 'base'  )
                removefKeys.push(baseKey)
            if (keys.length ==1 && keys[0] == "diff"  )
                addedKeys.push(baseKey)
        })
        return {"added":[...addedKeys], "removed":[...removefKeys], "changed":{...changedValues}}
    }

}