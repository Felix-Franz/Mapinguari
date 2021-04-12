import { Socket } from "socket.io";
import { GameManager } from "../..";
import { SocketClientEvents, SocketServerEvents } from "../core/types/SocketEventsEnum";
import ClientConnector from "../libraries/ClientConnector";
import SocketCallbackInterface from "./SocketCallbackInterface";

export default class LeaveRoom implements SocketCallbackInterface {
    readonly eventName: string = SocketClientEvents.StartGame;

    async handleSocket(socket: Socket) {
        try {
            const code = ClientConnector.getRoomFromSocket(socket)
            await GameManager.startGame(code, socket.id);
        } catch (e) {
            ClientConnector.emitToSocket(socket.id, SocketServerEvents.StartGameFailed);
        }
    }

}