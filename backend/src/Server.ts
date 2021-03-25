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
        this.io = new IOServer({
            path: `${__dirname}/public`
        });
        this.httpServer.listen(config.port);

        this.io.on("connection", (socket: Socket) => {
            console.log("hi");
            socket.send("Hello World!")
        });

        console.log(`Cthulu startet on http://localhost:${config.port}`)
    }
}
