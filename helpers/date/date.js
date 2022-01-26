
function getDateYMD(){
    return new Date().toISOString().split('T')[0]
}


function getDateYMDHM(){
    const timeArr = new Date().toISOString().split('T')
    return timeArr[0] + "_" +timeArr[1].substring(0,2)+'-'+ timeArr[1].substring(3,5)
}
module.exports = {
    getDateYMD,
    getDateYMDHM
}