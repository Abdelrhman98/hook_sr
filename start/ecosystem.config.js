module.exports = {
    apps: [
        {
            name: `BP_Config_${process.env.ENV}`,
            interpreter: "node@16.0.0",
            script: "../app.js",
            autorestart: false,
            time: true,
            watch: true,
            kill_timeout: 60000,
            env: {
                ENV:"local",
                HOST: "127.0.0.1",
                PORT:3000
            },
            env_development: {
                ENV:"dev",
                HOST: "10.22.1.183",
                PORT: 6001
            }
        }
    ]
}
