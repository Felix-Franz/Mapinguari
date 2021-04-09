import { Socket } from "socket.io";
import { SocketClientEvents, SocketServerEvents } from "../core/types/SocketEventsEnum";
import GameManager from "../libraries/GameManager";
import SocketCallbackInterface from "./SocketCallbackInterface";

export default class LeaveRoom implements SocketCallbackInterface {
    readonly eventName: string = SocketClientEvents.LeaveRoom;

    async handleSocket(socket: Socket, data: { code: string, name: string }) {
        try {
            await GameManager.leaveRoom(data.code, data.name);
            socket.leave(data.code);
            socket.emit(SocketServerEvents.RoomLeft, true);
        } catch (e) {
            socket.emit(SocketServerEvents.RoomLeft, false);
        }
    }

}