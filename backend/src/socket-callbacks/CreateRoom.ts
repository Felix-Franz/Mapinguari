import SocketCallbackInterface from "./SocketCallbackInterface";
import SocketEvents from "../core/types/SocketEvents";
import {Socket} from "socket.io";
import GameManager from "../libraries/GameManager";

export default class CreateRoom implements SocketCallbackInterface{
    readonly eventName: string = SocketEvents.CreateRoom;

    handleSocket(socket: Socket): void {
        const roomId = GameManager.createGame("Test");
    }

}
