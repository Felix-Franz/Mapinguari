import SocketCallbackInterface from "./SocketCallbackInterface";
import {Socket} from "socket.io";
import {LEVELS, Logger} from "../libraries/Logger";

export default class Disconnect implements SocketCallbackInterface{

    readonly eventName: string = "disconnect";

    handleSocket(socket: Socket): void {
        Logger.log(LEVELS.debug, `Disconnected from socket!`, {socketId: socket.id})
    }

}
