module.exports = {
    apps: [
        {
            name: `BP_Config_${process.env.environment}`,
            interpreter: "node@16.0.0",
            script: "../app.js",
            autorestart: false,
            time: true,
            watch: false,
            kill_timeout: 60000,
            env_LOCAL: {
                SER_REPO_HOST: "127.0.0.1",
                ORA_SDTZ: 'UTC'
            },
            env: {
                SER_REPO_HOST: "10.22.1.183",
                PORT: 6001,
                ORA_SDTZ: 'UTC'
            }
        }
    ]
}
