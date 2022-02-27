module.exports = {
    local: {
        limit: 10,
        oldSchema: {
            user: "rep",
            password: "rep",
            connectString: "10.22.1.181:1521/repdb"
        },
        reportingSchema: {
            user: "rep",
            password: "rep",
            connectString: "10.22.1.181:1521/repdb"
        },
        chargingSchema: {
            user: "rep",
            password: "rep",
            connectString: "10.22.1.181:1521/repdb"
        },
        chargingSchema: {
            user: "rep",
            password: "rep",
            connectString: "10.22.1.181:1521/repdb"
        },
        newReportingSchema: {
            user: "report",
            password: "report",
            connectString: "10.29.41.61:1521/REPDB"
        }
    },
    development: {
        limit: 10,
        oldSchema: {
            user: "rep",
            password: "rep",
            connectString: "10.22.1.181:1521/repdb"
        },
        reportingSchema: {
            user: "rep",
            password: "rep",
            connectString: "10.29.41.61:1521/repdb"
        },
        chargingSchema: {
            user: "report",
            password: "report",
            connectString: "10.29.41.61:1521/REPDB"
        },
        newReportingSchema: {
            user: "rep",
            password: "rep",
            connectString: "10.29.41.61:1521/repdb"
        }
    },
    uat: {
        limit: 10,
        oldSchema: {
            user: "report",
            password: "report",
            connectString: "10.29.41.61:1521/repdb"
        },
        reportingSchema: {
            user: "report",
            password: "report",
            connectString: "10.29.41.61:1521/REPDB"
        },
        chargingSchema: {
            user: "report",
            password: "report",
            connectString: "10.29.41.61:1521/REPDB"
        },
        newReportingSchema: {
            user: "report",
            password: "report",
            connectString: "10.29.41.61:1521/REPDB"
        }
    },
    staging: {
        limit: 10,
        oldSchema: {
            user: "report",
            password: "report",
            connectString: "10.29.41.64:1521/REPDB"
        },
        reportingSchema: {
            user: "report",
            password: "report",
            connectString: "10.29.41.64:1521/REPDB"
        },
        chargingSchema: {
            user: "report",
            password: "report",
            connectString: "10.29.41.64:1521/REPDB"
        },
        newReportingSchema: {
            user: "report",
            password: "report",
            connectString: "10.29.41.64:1521/REPDB"
        }
    },
    production_old: {
        limit: 10,
        oldSchema: {
            user: "REP",
            password: "rep",
            connectString: "10.29.41.43:1521/repdb"
        },
        reportingSchema: {
            user: "REP",
            password: "rep",
            connectString: "10.29.41.43:1521/repdb"
        },
        chargingSchema: {
            user: "REP",
            password: "r3p2021",
            connectString: "10.29.41.37:1521/DAMENB"
        },
        newReportingSchema: {
            username: "rep",
            password: "rep",
            connectString: "10.29.41.72:1521/repdb"
        }
    },
    production: {
        limit: 10,
        oldSchema: {
            username: "rep",
            password: "rep",
            connectString: "10.29.41.72:1521/repdb"
        },
        reportingSchema: {
            username: "rep",
            password: "rep",
            connectString: "10.29.41.72:1521/repdb"
        },
        chargingSchema: {
            username: "rep",
            password: "rep",
            connectString: "10.29.41.72:1521/repdb"
        },
        newReportingSchema: {
            username: "rep",
            password: "rep",
            connectString: "10.29.41.72:1521/repdb"
        }
    }
}[process.env.ENV || 'local'];
