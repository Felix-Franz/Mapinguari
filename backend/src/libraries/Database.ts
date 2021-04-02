import { MongoMemoryServer } from 'mongodb-memory-server';
import Mongoose from 'mongoose';
import { Logger } from '../..';
import { LEVELS } from './Logger';
import Models from './Models';

export default class Database {
    private static database: MongoMemoryServer;

    public static async start() {
        this.database = new MongoMemoryServer({
            binary: {
            }
        });
        Logger.log(LEVELS.silly, "Database started!");

        Mongoose.connection.on("connected", () => Logger.log(LEVELS.silly, "Database connection established!"));
        Mongoose.connection.on("disconnected", () => Logger.log(LEVELS.warn, "Disconnected from database!"));
        // https://github.com/nodkz/mongodb-memory-server#provide-connection-string-to-mongoose
        const mongooseConfig = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
        await Mongoose.connect(await this.database.getUri(), mongooseConfig);

        Models.initialize();

        Logger.log(LEVELS.debug, "Database initialized!");

        Logger.log(LEVELS.debug, `Use this url to login to the mongodb database: ${(await this.database.getUri()).toString()}`);
    }

    public static get instance() {
        return this.database;
    }
}