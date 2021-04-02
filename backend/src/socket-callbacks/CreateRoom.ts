import SocketCallbackInterface from "./SocketCallbackInterface";
import {SocketClientEvents, SocketServerEvents} from "../core/types/SocketEventsEnum";
import {Socket} from "socket.io";
import GameManager from "../libraries/GameManager";

export default class CreateRoom implements SocketCallbackInterface{
    readonly eventName: string = SocketClientEvents.CreateRoom;

    async handleSocket(socket: Socket, data: any) {
        const roomId = await GameManager.createRoom(data);
        socket.emit(SocketServerEvents.RoomCreated, roomId);
    }

}
