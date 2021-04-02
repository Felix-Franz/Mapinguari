import http from "http";
import { Server as IOServer, Socket } from "socket.io";
import express from "express";
import cors from "cors";
import { LEVELS, Logger } from "./Logger";
import SocketCallbackInterface from "../socket-callbacks/SocketCallbackInterface";
import path from "path";
import ServiceInterface from "../services/ServiceInterface";
import Database from "./Database";

export type ServerConfigType = {
    port: number
}

export default class ClientConnector {
    private static app: express.Application;
    private static services: ServiceInterface[] = [];
    private static httpServer: http.Server;
    private static io: IOServer;
    private static socketCallbacks: SocketCallbackInterface[] = [];

    /**
     * Starts ClientConnector
     * @param {number} port where api & sockets listening to
     */
    public static async start(port: number) {

        this.app = express();
        this.app.use(cors({
            origin: process.env.NODE_ENV === "production" ? [] : [process.env["FRONTEND_URL"]!]
        }));
        this.app.use(express.static(`${__dirname}/../../public`));


        this.services = (await Promise.all(
            this
                .findJobs(`${__dirname}/../services`)
                .map(async (c) => (await import(c)).default)
        )).filter(c => !!c);

        this.services.forEach(service => {
            //@ts-ignore
            const s = new service();
            if (s.handleGet) {
                try {
                    this.app.get(`/api${s.path}`, s.handleGet);
                } catch (e) {
                    Logger.log(LEVELS.error, `Failed to add service GET ${s.path}`, e)
                }
            }
        });

        Logger.log(LEVELS.debug, "Added services");


        this.app.all("*", (req, res) => res.status(404).sendFile(path.resolve(`${__dirname}/../../public/index.html`)));
        this.httpServer = http.createServer(this.app);
        this.io = new IOServer(this.httpServer, {
            cors: {
                origin: process.env.NODE_ENV === "production" ? [] : [process.env["FRONTEND_URL"]!]
            }
        });
        this.httpServer.listen(port);


        this.socketCallbacks = (await Promise.all(
            this
                .findJobs(`${__dirname}/../socket-callbacks`)
                .map(async (c) => (await import(c)).default)
        )).filter(c => !!c);

        this.io.on("connection", (socket: Socket) => {
            try {
                Logger.log(LEVELS.debug, `Successfully connected to socket!`, { socketId: socket.id })
                socket.send("Successfully connected socket to the server!");
            } catch (e) {
                Logger.log(LEVELS.error, e.message);
            }

            this.socketCallbacks.forEach(callback => {
                try {
                    //@ts-ignore
                    const c = new callback();
                    socket.on(c.eventName, (data: any) => c.handleSocket(socket, data))
                } catch (e) {
                    Logger.log(LEVELS.error, e.message);
                }
            });
        });

        Logger.log(LEVELS.debug, "Added socket-callbacks");
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
