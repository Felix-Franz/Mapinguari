import http from "http";
import {Server as IOServer, Socket} from "socket.io";
import express from "express";
import {LEVEL, Logger} from "./Logger";

export default class Server {
    private static app : express.Application;
    private static httpServer: http.Server;
    private static io: IOServer;

    /**
     * Starts Cthulhu
     * @param {object} config object
     */
    public static start(config: {port: number} = {port: 8080}){
        this.app = express();
        this.app.use(express.static(`${__dirname}/../public`));
        this.httpServer = http.createServer(this.app);
        this.io = new IOServer(this.httpServer,{
            cors: {
                origin: process.env.NODE_ENV === "production" ? [] : ["http://localhost:3000"]
            }
        });
        this.httpServer.listen(config.port);

        this.io.on("connection", (socket: Socket) => {
            Logger.log(LEVEL.debug, `Successfully connected to socket!`, {socketId: socket.id})
            socket.send("Successfully connected socket to the server!");

            socket.on("disconnect", () => {
                Logger.log(LEVEL.debug, `Disconnected from socket!`, {socketId: socket.id})
            })
        });

        console.log(`Cthulu startet on http://localhost:${config.port}`)
    }
}
