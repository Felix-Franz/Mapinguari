import { Socket } from "socket.io";
import { SocketClientEvents, SocketServerEvents } from "../core/types/SocketEventsEnum";
import ClientConnector from "../libraries/ClientConnector";
import GameManager from "../libraries/GameManager";
import SocketCallbackInterface from "./SocketCallbackInterface";

export default class LeaveRoom implements SocketCallbackInterface {
    readonly eventName: string = SocketClientEvents.LeaveRoom;

    async handleSocket(socket: Socket, data: { code: string, name: string }) {
        try {
            const socketId = await GameManager.leaveRoom(data.code, data.name, socket.id);
            socket.leave(data.code);
            ClientConnector.emitToSocket(socketId, SocketServerEvents.RoomLeft, true);
        } catch (e) {
            ClientConnector.emitToSocket(socket.id, SocketServerEvents.RoomLeft, false);
        }
    }

}