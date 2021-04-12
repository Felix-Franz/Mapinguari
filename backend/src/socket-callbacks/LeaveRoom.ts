import { Socket } from "socket.io";
import { SocketClientEvents, SocketServerEvents } from "../core/types/SocketEventsEnum";
import ClientConnector from "../libraries/ClientConnector";
import GameManager from "../libraries/GameManager";
import SocketCallbackInterface from "./SocketCallbackInterface";

export default class LeaveRoom implements SocketCallbackInterface {
    readonly eventName: string = SocketClientEvents.LeaveRoom;

    async handleSocket(socket: Socket, name: string) {
        try {
            const roomCode = ClientConnector.getRoomFromSocket(socket)
            const socketId = await GameManager.leaveRoom(roomCode, name, socket.id);
            socket.leave(`room/${roomCode}`);
            ClientConnector.emitToSocket(socketId, SocketServerEvents.RoomLeft, true);
        } catch (e) {
            ClientConnector.emitToSocket(socket.id, SocketServerEvents.RoomLeft, false);
        }
    }

}