// const logger = require('../src/helpers/logger');
const oracledb = require('oracledb');
const debug = require("debug")("Databas:oracle_module");
const data = ['maxSize', 'val'];


module.exports = class {
    oracleInstance = null;

    constructor(aName, aConfig) {
        this.name = aName;
        this.config = aConfig;
        oracledb.autoCommit = true;
        oracledb.batchErrors = false;
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        oracledb.maxRows = 1000000;//TODO set config
        oracledb.fetchAsString = [oracledb.NUMBER, oracledb.CLOB]; //oracledb.DATE
        //  this.pool = oracledb.createPool(this.config);
        this.checkConnection();
    }

    static getInstance(aName, aConfig) {
        if (!this.oracleInstance) this.oracleInstance = {};
        if (!this.oracleInstance[aName])
            this.oracleInstance[aName] = new this(aName, aConfig);
        return this.oracleInstance[aName];
    }

    defineDBError(error) {
        let { message, errorNum } = error;
        debug("Detect db error ->>>> : ", message, errorNum);

        let errorsList = [1017, 12514];
        let level = errorsList.includes(errorNum) ? '-4' : '-5';
        // var error = (error.code && error.code.toString() === 'ETIMEDOUT') ?
        //     this.timeOutError :
        //     (error.code && ['ECONNREFUSED', 'PROTOCOL_CONNECTION_LOST',
        //         'ER_CON_COUNT_ERROR'].includes(error.code.toString())) ?
        //         this.systemError : this.codeDefect;

        return {
            level, message, errorNum, code: 'ODB1'
        }
    }

    async checkConnection() {
        let { error, connection } = await this.getConnection();
        connection && !error && connection.release();
        // error ?
        //     logger.error(`checkConnection  conn data ${this.config, this.name} conn have an error  error :${JSON.stringify(connection)}`)
        //     : debug('[', new Date(new Date() + 'UTC'), ']', "connect to db successfully");

    }

    async getConnection() {
        let connection, error;
        try {
            connection = await oracledb.getConnection(this.config);
            debug('Connection was successful!');
        } catch (err) {
            console.error("getConnectionError", err);
            error = this.defineDBError(err)
        }
        finally { return { error, connection } }
    }

    async executeStatement(stmt, data, logicConnection) {
        let connection, err;
        try {
            connection = logicConnection;
            if (!logicConnection) {
                var { error, ...rest } = await this.getConnection();
                connection = rest.connection
                if (error) throw error;
            }
            // connection.callTimeout = 60;
            var t = Date.now();
            // logger.info('start: executeStatement : ', { stmt, time: t });
            var executeResult = data ? await connection.execute(stmt, data) : await connection.execute(stmt);
            // logger.info('Done: executeStatement : ', { stmt, spendTime: (Date.now() - t) / 1000 });
            executeResult = executeResult.rows || executeResult;
        } catch (ex) {
            err = this.defineDBError(ex);
            // logger.error("executeStatement EXECUTE failed", { err })

        } finally {
            if (!logicConnection) { try { if (connection) await connection.close(); } catch (err) { console.error(err); } };
            //return { executeResult, error };
            if (err) {
                throw err;
            } else {
                return { executeResult, error: err };
            }
        }
    }


    async multipleExecute(sqlStatement = "", bindings = [], options) {
        let result, error, connection;
        try {
            let { connection, error } = await this.getConnection();
            if (error) throw error;
            // logger.info("multipleExecute EXECUT query", { sqlStatement, options })
            result = await connection.executeMany(sqlStatement, bindings, options);
        } catch (ex) {
            error = this.defineDBError(ex);
            // logger.error("multipleExecute EXECUTE failed", { error })
        } finally {
            if (connection) { try { await connection.close(); } catch (err) { console.error(err); } };
            return { result, error };
        }
    }

    async insertAll(rows) {
        rows = rows.join('');
        let query = ` INSERT ALL ${rows} SELECT 1 FROM dual `;
        return (await this.executeStatement(query)).executeResult;
    }

    async transactionExecute(queries = [{ sqlStatement: "", bindDefs: {}, bindings: [] }]) {
        let result = [], error, connection;
        try {
            let { connection, error } = await this.getConnection();
            if (error) throw error;
            for (let { sqlStatement, bindings, bindDefs } of queries) {
                // logger.info("transactionExecute EXECUT query", { sqlStatement })
                result.push(await connection.executeMany(sqlStatement, bindings, {
                    autoCommit: false,
                    batchErrors: false,
                    //bindDefs          // problem with bind defs
                }));
                // logger.info("transactionExecute Executed Successfully");
            }
            await connection.commit()
        } catch (ex) {
            error = this.defineDBError(ex)
            if (connection) { try { await connection.rollback(); } catch (err) { console.error(err); } };
            // logger.error("transactionExecute EXECUTE failed", { error })
        } finally {
            if (connection) { try { await connection.close(); } catch (err) { console.error(err); } };
            return { result, error };
        }
    }

    async executeMultipleStatement(stmt, logicConnection) {
        try {
            var connection = logicConnection;
            if (!logicConnection) {
                var { error, ...rest } = await this.getConnection();
                connection = rest.connection
                if (error) throw error;
            }
            connection.callTimeout = 60;
            let t = Date.now();
            // logger.log("executeMultipleStatement EXECUTE", { stmt, "time: ": t })
            let executeResult = await connection.execute(stmt);
            // logger.log("executeMultipleStatement Executing done", { "spendTime": (Date.now() - t) / 1000 })

            executeResult = executeResult.rows;
        } catch (ex) {
            error = this.defineDBError(ex);
            // logger.error("executeMultipleStatement EXECUTE failed", { error })
        } finally {
            if (!logicConnection) { try { if (connection) await connection.close(); } catch (err) { console.error(err); } };
            return { executeResult, error };
        }
    }

    async closeConnection(connection) {
        if (connection) { 
            try {
                await connection.close(); return "success"
            } catch (err) {
                console.error('closeConnection error ', err);
            }
        };
    }

    async closePoolAndExit() {
        debug('\nTerminating');
        try {
            // Get the pool from the pool cache and close it when no
            // connections are in use, or force it closed after 10 seconds.
            // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
            // This setting should not be needed if both Oracle Client and Oracle
            // Database are 19c (or later).
            await oracledb.getPool().close(10);
            debug('Pool closed');
            process.exit(0);
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    }

    static get schemaDataTypes() {
        return {
            NUMBER: {
                identifier: 'number',
                oracleType: oracledb.NUMBER
            }, STRING: {
                identifier: 'string',
                oracleType: oracledb.DB_TYPE_VARCHAR
            }, DATE: {
                identifier: 'date',
                oracleType: oracledb.DATE
            }, TIMESTAMP: {
                identifier: 'timestamp',
                oracleType: oracledb.DATE
            }, CLOB: {
                identifier: 'clob',
                oracleType: oracledb.DB_TYPE_CLOB
            },
        }
    }
}