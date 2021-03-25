import {io as ioClient, Socket as ioSocket} from "socket.io-client";

export default class SocketClient {
    private static io: ioSocket;

    public static createConnection() {
        if (!!this.io)
            throw  new Error("Connection is already established!");

        if (process.env.NODE_ENV === "production")
            this.io = ioClient(undefined);
        else
            this.io = ioClient("http://localhost:8080");

        this.io.on("message", data => console.log(`[Socket] ${data}`))
    }

    public static get Socket() {
        return this.io;
    }
}
