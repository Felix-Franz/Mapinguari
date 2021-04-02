import { Model } from "mongoose";
import { string } from "yargs";
import { Logger } from "../..";
import PlayerRoleEnum from "../core/types/PlayerRoleEnum";
import PlayerType from "../core/types/PlayerType";
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
     * @param code 
     * @param name 
     */
    public static async joinRoom(code: string, name: string, socketId: string) {
        //ToDo
        // X change disconnected callback (remove from rooms, set in room db player state)
        // X if name exists & disconnected --> use this player
        // X if name exists && connected --> throw error
        // X if first player --> Admin
        // X else create new player
        // inform others about new player

        const room = await Models.Rooms.findOne({ code: code });

        if (!room)
            throw new Error("Room does not exist!");

        const playerIndex = room.players.findIndex(p => p.name === name);

        if (playerIndex === -1) { // player name does not exist --> new player
            const role = room.players.length === 0 ? PlayerRoleEnum.MANAGER : PlayerRoleEnum.USER;
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
    }

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

}
