import { Socket } from "socket.io";
import { GameManager } from "../..";
import PlayerType from "../core/types/PlayerType";
import GameMessageEnum from "../core/types/GameMessageEnum";
import { SocketClientEvents, SocketServerEvents } from "../core/types/SocketEventsEnum";
import ClientConnector from "../libraries/ClientConnector";
import SocketCallbackInterface from "./SocketCallbackInterface";

export default class SelectCard implements SocketCallbackInterface {
    readonly eventName: string = SocketClientEvents.SelectCard;

    async handleSocket(socket: Socket, data : {player: PlayerType, cardIndex: number}) {
        try {
            const code = ClientConnector.getRoomFromSocket(socket)
            await GameManager.selectCard(code, socket.id, data.player, data.cardIndex);
        } catch (e) {
            ClientConnector.emitToSocket(socket.id, SocketServerEvents.ChangeGame, {message: GameMessageEnum.SELECTCARDFAILED});
        }
    }

}