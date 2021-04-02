import ClientConnector from "./ClientConnector";
import Database from "./Database";
import { LEVELS, Logger } from "./Logger";

export type ServerConfigType = {
    port: number
}

export default class Server {
    /**
     * Starts Mapinguari
     * @param {object} config object
     */
    public static async start(config: ServerConfigType) {

        Database.start();
        await ClientConnector.start(config.port);

        Logger.log(LEVELS.success, `Mapinguari startet on http://localhost:${config.port}`)
    }

    /**
     * Recursive helper function to get all files of the jobPath folder.
     * @param path
     * @returns {*[]} config files
     */
    private static findJobs(path: string) {
        let fs = require("fs");
        let result = fs.readdirSync(path);
        for (let i = 0; i < result.length; ++i) {
            result[i] = path + "/" + result[i]
            if (fs.lstatSync(result[i]).isDirectory()) {
                result[i] = this.findJobs(result[i]);
            }
        }
        return [].concat.apply([], result);
    }

}
