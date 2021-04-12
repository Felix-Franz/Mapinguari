import { Socket } from "socket.io";
import { GameManager } from "../..";
import { SocketClientEvents, SocketServerEvents } from "../core/types/SocketEventsEnum";
import ClientConnector from "../libraries/ClientConnector";
import SocketCallbackInterface from "./SocketCallbackInterface";

export default class LeaveRoom implements SocketCallbackInterface {
    readonly eventName: string = SocketClientEvents.StopGame;

    async handleSocket(socket: Socket) {
        try {
            const code = ClientConnector.getRoomFromSocket(socket)
            await GameManager.stopGame(code, socket.id);
        } catch (e) {
            ClientConnector.emitToSocket(socket.id, SocketServerEvents.StopGameFailed);
        }
    }

}