import SocketCallbackInterface from "./SocketCallbackInterface";
import {Socket} from "socket.io";
import {LEVEL, Logger} from "../libraries/Logger";

export default class Disconnect implements SocketCallbackInterface{

    readonly eventName: string = "disconnect";

    handleSocket(socket: Socket): void {
        Logger.log(LEVEL.debug, `Disconnected from socket!`, {socketId: socket.id})
    }

}
