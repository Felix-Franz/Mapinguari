import SocketCallbackInterface from "./SocketCallbackInterface";
import {SocketClientEvents} from "../core/types/SocketEventsEnum";
import {Socket} from "socket.io";
import GameManager from "../libraries/GameManager";

export default class CreateRoom implements SocketCallbackInterface{
    readonly eventName: string = SocketClientEvents.CreateRoom;

    handleSocket(socket: Socket): void {
        const roomId = GameManager.createGame("Test");
    }

}
