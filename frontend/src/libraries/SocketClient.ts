import { io as ioClient, Socket as ioSocket } from "socket.io-client";
import { SocketClientEvents, SocketServerEvents } from "../core/types/SocketEventsEnum";

export default class SocketClient {
    private static io: ioSocket;

    public static createConnection(host?: string) {
        if (!!this.io)
            throw new Error("Connection is already established!");

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

export class SocketSender {
    /**
     * Creates a new room
     * @param {string} name of the new room
     */
    public static createRoom(name: string) {
        SocketClient.Socket.emit(SocketClientEvents.CreateRoom, name);
    }
}


export class SocketReceiver {
    /**
     * Will be called if room is created
     * @param {(roomCode: string) => void} callback that returns roomCode 
     */
    public static onRoomCreated(callback: (roomCode: string) => void) {
        SocketClient.Socket.on(SocketServerEvents.RoomCreated, callback);
    }
}
