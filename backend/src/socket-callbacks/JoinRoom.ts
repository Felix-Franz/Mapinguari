import { Socket } from "socket.io";
import { SocketClientEvents, SocketServerEvents } from "../core/types/SocketEventsEnum";
import GameManager from "../libraries/GameManager";
import SocketCallbackInterface from "./SocketCallbackInterface";

export default class CheckRoom implements SocketCallbackInterface {
    readonly eventName: string = SocketClientEvents.JoinRoom;

    async handleSocket(socket: Socket, data: { code: string, name: string }) {
        try {
            await GameManager.joinRoom(data.code, data.name, socket.id);
            socket.join(data.code);
            socket.emit(SocketServerEvents.RoomJoined, true);
        } catch (e) {
            socket.emit(SocketServerEvents.RoomJoined, false);
        }
    }

}