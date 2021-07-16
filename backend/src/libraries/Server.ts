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

        await Database.start();
        await ClientConnector.start(config.port);

        Logger.log(LEVELS.success, `Mapinguari startet on http://localhost:${config.port}`);
    }
}
