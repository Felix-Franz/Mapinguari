import { io as ioClient, Socket as ioSocket } from "socket.io-client";

export default class SocketClient {
    private static io: ioSocket;

    public static createConnection(host?: string) {
        if (!!this.io)
            throw  new Error("Connection is already established!");

        if (host)
            this.io = ioClient(host);
        else
            this.io = ioClient();

        this.io.on("message", data => console.log(`[Socket] ${data}`))
    }

    public static get Socket() {
        return this.io;
    }
}
