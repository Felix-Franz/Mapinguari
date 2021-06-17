import SocketCallbackInterface from "./SocketCallbackInterface";
import {SocketClientEvents, SocketServerEvents} from "../core/types/SocketEventsEnum";
import {Socket} from "socket.io";
import GameManager from "../libraries/GameManager";
import ClientConnector from "../libraries/ClientConnector";

export default class CheckRoom implements SocketCallbackInterface{
    readonly eventName: string = SocketClientEvents.ChangeMeeting;

    async handleSocket(socket: Socket, enableMeeting: boolean) {
        try {
            const code = ClientConnector.getRoomFromSocket(socket)
            await GameManager.changeMeeting(code, socket.id, enableMeeting);
        } catch (e) {
            ClientConnector.emitToSocket(socket.id, SocketServerEvents.MeetingChangedFailed);
        }
    }

}
