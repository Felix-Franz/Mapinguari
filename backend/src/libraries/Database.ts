import { MongoMemoryServer } from 'mongodb-memory-server';
import { Logger } from '../..';
import { LEVELS } from './Logger';

export default class Database {
    private static database : MongoMemoryServer;

    public static start() {
        this.database = new MongoMemoryServer();

        //ToDo open connections, init models
        Logger.log(LEVELS.debug, "Database started!");
    }

    public static get instance(){
        return this.database;
    }
}