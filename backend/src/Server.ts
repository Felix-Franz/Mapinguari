import http from "http";
import {Server as IOServer, Socket} from "socket.io";
import express from "express";

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
            console.log(`Successfully connected ${socket.id} to the server!`)
            socket.send("Successfully connected to the server!");

            socket.on("disconnect", () => {
                console.log(`Disconnected ${socket.id} from the server!`)
            })
        });

        console.log(`Cthulu startet on http://localhost:${config.port}`)
    }
}
