import { io as ioClient, Socket as ioSocket } from "socket.io-client";
import { SocketClientEvents, SocketServerEvents } from "../core/types/SocketEventsEnum";

export default class SocketClient {
    private static io: ioSocket;

    /**
     * Connects to socket server
     * @param {string} host url 
     */
    public static createConnection(host?: string): Promise<void> {
        return new Promise((resolve, reject) => {

            if (!!this.io)
                throw new Error("Connection is already established!");

            if (host)
                this.io = ioClient(host);
            else
                this.io = ioClient();

            this.io.on("message", data => {
                console.log(`[Socket] ${data}`)
                resolve();
            });

        });
    }

    /**
     * socket.io socket
     */
    public static get Socket() {
        return this.io;
    }

    /**
     * Emits an event
     * @param {SocketClientEvents} event to be emmitted
     * @param {any} data that will be sent
     */
    public static emit(event: SocketClientEvents, data?: any) {
        this.io.emit(event, data);
    }

    /**
     * Adds listener for event
     * @param {SocketServerEvents} event name
     * @param {(data?: any) => void} callback that will be triggered for event
     */
    public static on(event: SocketServerEvents, callback: (data?: any) => void) {
        this.io.on(event, callback);
    }

    /**
     * Removes listener for event
     * @param {SocketServerEvents} event name
     */
    public static off(event: SocketServerEvents) {
        this.io.off(event);
    }
}
