import { MongoMemoryServer } from 'mongodb-memory-server';
import Mongoose from 'mongoose';
import { Logger } from '../..';
import { LEVELS } from './Logger';
import Models from './Models';

export default class Database {
    private static database : MongoMemoryServer;

    public static async start() {
        this.database = new MongoMemoryServer();
        Logger.log(LEVELS.silly, "Database started!");

        Mongoose.connection.on("connected", () => Logger.log(LEVELS.silly, "Database connection established!"));
        Mongoose.connection.on("disconnected", () => Logger.log(LEVELS.warn, "Disconnected from database!"));
        await Mongoose.connect(await this.database.getUri())

        Models.initialize();
        
        Logger.log(LEVELS.debug, "Database initialized!");
    }

    public static get instance(){
        return this.database;
    }
}