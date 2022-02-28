// const Sequelize = require('sequelize')
// const { QueryTypes } = require('@sequelize/core');
// const { isColString } = require('sequelize/types/utils');
// // require('dotenv').config()
// const conn =  {
//     database: "transactions_uat",
//     host: "10.22.1.228",
//     port: "3306",
//     user: "Smart",
//     password: "1234",
//     timezone: 'Z',
//     supportBigNumbers: true
// }
// const db = {};
// const host = conn.host
// const port = conn.port
// const sequelize = new Sequelize(conn.database, conn.user,conn.password, {
//     host,
//     port,
//     pool: {
//       max: 100,
//       min: 1,
//       acquire: 90000,
//       idle: 60000,
//     },
//     dialect: 'mysql',
//     logging: false
// });
// sequelize
//   .authenticate()
//   .then(() => console.log("Connected to the database successfully..."))
//   .catch((error) => console.log("Unable to connect to the database: " + error));

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// module.exports = db;

// const options = {
//     freezeTableName: true,
//     tableName: 'test',
//     modelName: 'test',
// }
// const test = db.sequelize.define(
//     'test',
//     {
//         name: {
//             type: db.Sequelize.STRING(45),
//             allowNull: false,
//         },
//         count : {
//             type: db.Sequelize.INTEGER(10),
//         }
//     },
//     options,
// )

// sequelize.model("test").create({
//     name: "Damen",
//     count: 10
// })

// const mysqlConn = require('../../connections/mySQLConn')
const mysqlcred = {
    database: "transactions_uat",
    host: "10.22.1.228",
    port: "3306",
    user: "Smart",
    password: "1234",
    timezone: 'Z',
    supportBigNumbers: true
}

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: mysqlcred.host,
    user: mysqlcred.user,
    password:mysqlcred.password,
    database: mysqlcred.database
});


const serviceRepo = require('./latestser.json')
serviceRepo.data.forEach(data=>{
    connection.query(`INSERT INTO BILLERS_NEW (ar_name, en_name, main_biller,damen_code, provider_id) VALUES (?,?,?,?,?)`,[
        data.ar_name, data.en_name,data.main_biller,data.ser_id,data.provider_id
    ],function(err,results, fields){
        if(err)
            console.log(err)
        console.log(results); // results contains rows returned by server
        // console.log(fields);
    })
    
})
