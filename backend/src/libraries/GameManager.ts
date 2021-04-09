import { Model } from "mongoose";
import { string } from "yargs";
import { Logger } from "../..";
import PlayerRoleEnum from "../core/types/PlayerRoleEnum";
import PlayerType from "../core/types/PlayerType";
import RoomStateEnum from "../core/types/RoomStateEnum";
import RoomType from "../core/types/RoomType";
import { SocketServerEvents } from "../core/types/SocketEventsEnum";
import ClientConnector from "./ClientConnector";
import Generator from "./Generator";
import { LEVELS } from "./Logger";
import Models from "./Models";

export default class GameManager {

    /**
     * Creates a new room
     * @param {string} name room name
     * @returns {string} roomId of the new room
     */
    public static async createRoom(name: string): Promise<string> {
        const code = await Generator.generateRooomCode();
        Models.Rooms.create({
            code,
            name
        });
        setTimeout(async () => {
            const room = await Models.Rooms.findOne({ code })
            if (room && room.players.length === 0) {
                Logger.log(LEVELS.debug, `Deleting empty room ${room.name} with code ${code}!`);
                await room.delete();
            }
        }, 60 * 60 * 1000)  // 1h
        return code;
    }

    /**
     * Checks if room exists
     * @param {string} code of the room
     * @returns {boolean}
     */
    public static async checkRoom(code: string): Promise<boolean> {
        return await Models.Rooms.exists({ code });
    }

    /**
     * Joins a player
     * @param {string} code room code
     * @param {string} name of the player 
     * @returns {RoomType} room data
     */
    public static async joinRoom(code: string, name: string, socketId: string): Promise<RoomType> {
        const room = await Models.Rooms.findOne({ code: code });

        if (!room)
            throw new Error("Room does not exist!");

        const playerIndex = room.players.findIndex(p => p.name === name);

        if (playerIndex === -1) { // player name does not exist --> new player
            const role = room.players.length === 0 ? PlayerRoleEnum.ADMIN : PlayerRoleEnum.USER;
            const connected = true;
            room.players.push({
                socketId,
                name,
                role,
                connected
            });
            ClientConnector.emitToRoom(code, SocketServerEvents.PlayerJoined, { name, role, connected });
        } else if (!room.players[playerIndex]?.connected) { //player name exists but is disconnected
            const role = room!.players[playerIndex].role;
            const connected = true;
            room!.players[playerIndex] = {
                socketId,
                name,
                role,
                connected
            }
            ClientConnector.emitToRoom(code, SocketServerEvents.PlayerReconnected, { name, role, connected });
        } else    //player name exists but is still connected
            throw new Error("Player with this name is already connected!");

        room.save();

        return {
            code: room!.code,
            name: room!.name,
            state: room!.state,
            players: room!.players.map(p => {
                return {
                    name: p.name,
                    role: p.role,
                    connected: p.connected
                };
            }),
            places: []
        };
    }

    /**
     * Disconnect socket from room
     * @param {string} socketId
     */
    public static async disconnectRooms(socketId: string) {
        const rooms = await Models.Rooms.find({ "players.socketId": socketId });
        for (const r of rooms) {
            const playerIndex = r.players.findIndex(p => p.socketId === socketId)!;
            r.players[playerIndex].socketId = undefined;
            r.players[playerIndex].connected = false;
            if (r.players.filter(p => p.connected).length > 0) {
                ClientConnector.emitToRoom(r.code, SocketServerEvents.PlayerDisconnected, { name: r.players[playerIndex].name, role: r.players[playerIndex].role, connnected: false });
                Logger.log(LEVELS.silly, `Dissconnect ${r.players[playerIndex].name} from room ${r.name} with code ${r.code}`);
                await r.save();
            }
            else {
                Logger.log(LEVELS.silly, `Delete empty room ${r.name} with code ${r.code}`);
                await r.delete();
            }
        }
    }

    /**
     * Completly leave room
     * @param {string} code roomCode
     * @param {string} name personal name
     * @returns {string} socketId
     */
    public static async leaveRoom(code: string, name: string, socketId: string) : Promise<string> {
        const room = await Models.Rooms.findOne({ code });
        if (!room)
            throw new Error("Room with this code does not exist!");
        if (room.players.filter(p => p.socketId === socketId && (p.role === PlayerRoleEnum.ADMIN || p.name === name)).length === 0)
            throw new Error("Player is not allowed to leave room for this player name");
        const oldPlayer = room.players.find(p => p.name === name);
        if (!oldPlayer)
            throw new Error("There is no player with this name in this room!");
        Logger.log(LEVELS.silly, `Disconnect ${name} from room with name ${room.name} and code ${code}`);

        room.players = room.players.filter(p => p.name !== name);
        if (room.players.length === 0) {
            Logger.log(LEVELS.silly, `Delete empty room ${name} with code ${code}`);
            room.delete();
            return oldPlayer.socketId!;
        }
        if (room.players.filter(p => p.role === PlayerRoleEnum.ADMIN).length === 0) {
            room.players[0].role = PlayerRoleEnum.ADMIN;
            ClientConnector.emitToRoom(code, SocketServerEvents.PlayerRoleChanged, { name: room.players[0].name, role: room.players[0].role, connected: room.players[0].connected });
        }

        room.save();
        ClientConnector.emitToRoom(code, SocketServerEvents.PlayerLeft, oldPlayer.name);
        return oldPlayer.socketId!;
    }

}
