import SocketCallbackInterface from "./SocketCallbackInterface";
import {SocketClientEvents, SocketServerEvents} from "../core/types/SocketEventsEnum";
import {Socket} from "socket.io";
import GameManager from "../libraries/GameManager";

export default class CheckRoom implements SocketCallbackInterface{
    readonly eventName: string = SocketClientEvents.CheckRoom;

    async handleSocket(socket: Socket, code: string) {
        const exists = await GameManager.checkRoom(code);
        socket.emit(SocketServerEvents.RoomChecked, exists);
    }

}
