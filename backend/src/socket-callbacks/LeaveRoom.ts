import { Socket } from "socket.io";
import { SocketClientEvents, SocketServerEvents } from "../core/types/SocketEventsEnum";
import ClientConnector from "../libraries/ClientConnector";
import GameManager from "../libraries/GameManager";
import { LEVELS, Logger } from "../libraries/Logger";
import SocketCallbackInterface from "./SocketCallbackInterface";

export default class LeaveRoom implements SocketCallbackInterface {
    readonly eventName: string = SocketClientEvents.LeaveRoom;

    async handleSocket(socket: Socket, name: string) {
        try {
            const roomCode = ClientConnector.getRoomFromSocket(socket)
            const socketId = await GameManager.leaveRoom(roomCode, name, socket.id);
            socket.leave(`room/${roomCode}`);
            ClientConnector.emitToSocket(socketId, SocketServerEvents.RoomLeft, {success: true, name});
        } catch (e) {
            Logger.log(LEVELS.error, `${name} could not leave room!`, e);
            ClientConnector.emitToSocket(socket.id, SocketServerEvents.RoomLeft, {success: false, name});
        }
    }

}