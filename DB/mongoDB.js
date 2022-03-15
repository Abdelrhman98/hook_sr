const mongoose = require("mongoose")
const { MongoUri } = require('./DBCredentials/mongoConnection')

const modelsPath = require("path").join(__dirname, "./models");

class MongoConnection {
    constructor(uri) {
        this.uri = uri
        this.client = null;
    }

    async initialize(uri) {
        if (!this.client) {
            if (uri) this.uri = uri;
            try {
                this.client = await mongoose.connect(this.uri, {
                    useNewUrlParser: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                })
                console.log(`Connected to Mongo Cluster successfully`)
                // Load all models when initializing db
                require("fs").readdirSync(modelsPath).forEach((file) => require("./models/" + file));
                console.log(`Models loaded successfully`)
            } catch (error) {
                console.error(`Connection to Mongo Cluster failed: ${error} \n Reconnecting...`);
                setTimeout(async () => await this.initialize(), 5000);
            }
        } else console.log(`Db already initialized`)
        return this;
    }

    async close() {
        this.client && await this.client.connection.close()
        console.log(`Mongo connection closed`)
        return this
    }

    async startTransaction() {
        let session = await mongoose.startSession();
        session.startTransaction();
        return session;
    }
}

module.exports = new MongoConnection(MongoUri)