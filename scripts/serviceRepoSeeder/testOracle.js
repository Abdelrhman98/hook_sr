// const oracle = require('./connections/oracleConn')
const orcaleDB = require('./DB/oracle/oracleDB');

const { newReportingSchema: oracleConfig } = require('./connections/oracleConn');
execute = async () => {
    const orcaleClient = orcaleDB.getInstance(oracleConfig.connectString, oracleConfig);

    let query = `select * FROM MAIN_BILLER `
    let { executeResult } = await orcaleClient.executeStatement(query);
    return executeResult;
}

let test = async()=>{
    console.log(await execute())
}
test()
