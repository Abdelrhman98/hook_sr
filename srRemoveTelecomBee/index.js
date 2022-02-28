const sr = require('./service_repo_production.json')
const {writeJson} = require('../helpers/files/file.js')
let newSer = {}
newSer['serviceRepoVersion'] = sr.serviceRepoVersion
newSer['data'] = []
let telecom = ['ويي' , 'فودافون' , 'اتصالات' , 'اورانج']
let cnt = 0
let removedSers = []
sr.data.forEach(data=>{
    if(telecom.includes(data.main_biller) && data.provider_id == 3){
        cnt+=1;
        removedSers.push(data.ser_id)
    }
    else{
        newSer['data'].push(data)
    }
})
writeJson("log.json",{
    "totalServiceCount": sr.data.length,
    "removedServiceCount":removedSers.length, 
    "newServicesCount":newSer.data.length
})
writeJson("newSR.json",newSer)
writeJson("removedSR.json",removedSers)
// console.log(cnt)