import SocketCallbackInterface from "./SocketCallbackInterface";
import {Socket} from "socket.io";
import {LEVELS, Logger} from "../libraries/Logger";
import { GameManager } from "../..";

export default class Disconnect implements SocketCallbackInterface{

    readonly eventName: string = "disconnect";

    handleSocket(socket: Socket): void {
        GameManager.disconnectRooms(socket.id);
        Logger.log(LEVELS.debug, `Disconnected from socket!`, {socketId: socket.id})
    }

}
