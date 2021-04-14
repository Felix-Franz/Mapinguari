import { Logger } from "../..";
import AvatarConfigurationType from "../core/types/AvatarConfigurationType";
import PlayerRoleEnum from "../core/types/PlayerRoleEnum";
import RoomStateEnum from "../core/types/RoomStateEnum";
import RoomType from "../core/types/RoomType";
import { SocketServerEvents } from "../core/types/SocketEventsEnum";
import ClientConnector from "./ClientConnector";
import Generator from "./Generator";
import { LEVELS } from "./Logger";
import Models from "./Models";

export default class GameManager {

    /**
     * Checks weather user is admin
     * @param {string} socketId 
     * @param {string} code for room 
     * @returns {boolean} admin?
     */
    private static async isAdmin(socketId: string, code: string): Promise<boolean> {
        return Models.Rooms.exists({ players: { $elemMatch: { socketId, role: PlayerRoleEnum.ADMIN } }, "code": code });
    }

    /**
     * Creates a new room
     * @param {string} name room name
     * @returns {string} roomId of the new room
     */
    public static async createRoom(name: string): Promise<string> {
        const code = await Generator.generateRooomCode();
        await Models.Rooms.create({
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
     * @param {AvatarConfigurationType} avatar configuration
     * @returns {RoomType} room data
     */
    public static async joinRoom(code: string, name: string, avatar: AvatarConfigurationType, socketId: string): Promise<RoomType> {
        const room = await Models.Rooms.findOne({ code: code });

        if (!room)
            throw new Error("Room does not exist!");

        const playerIndex = room.players.findIndex(p => p.name === name);

        if (playerIndex === -1) { // player name does not exist --> new player
            if (room.state !== RoomStateEnum.LOBBY)
                throw new Error("Game is already in progress");
            const role = room.players.length === 0 ? PlayerRoleEnum.ADMIN : PlayerRoleEnum.USER;
            const connected = true;
            room.players.push({
                socketId,
                name,
                avatar,
                role,
                connected
            });
            ClientConnector.emitToRoom(code, SocketServerEvents.PlayerJoined, { name, avatar, role, connected });
        } else if (!room.players[playerIndex]?.connected) { //player name exists but is disconnected
            const role = room!.players[playerIndex].role;
            const connected = true;
            room!.players[playerIndex] = {
                socketId,
                name,
                avatar,
                role,
                connected
            }
            ClientConnector.emitToRoom(code, SocketServerEvents.PlayerReconnected, { name, avatar, role, connected });
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
                    avatar: p.avatar,
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
                ClientConnector.emitToRoom(r.code, SocketServerEvents.PlayerDisconnected, { name: r.players[playerIndex].name, avatar: r.players[playerIndex].avatar, role: r.players[playerIndex].role, connnected: false });
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
    public static async leaveRoom(code: string, name: string, socketId: string): Promise<string> {
        const room = await Models.Rooms.findOne({ code });
        if (!room)
            throw new Error("Room with this code does not exist!");
        if (room.players.filter(p => p.socketId === socketId && (this.isAdmin(socketId, code) || p.name === name)).length === 0)
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
            ClientConnector.emitToRoom(code, SocketServerEvents.PlayerRoleChanged, { name: room.players[0].name, avatar: room.players[0].avatar, role: room.players[0].role, connected: room.players[0].connected });
        }

        room.save();
        ClientConnector.emitToRoom(code, SocketServerEvents.PlayerLeft, {name: oldPlayer.name, avatar: oldPlayer.avatar});
        return oldPlayer.socketId!;
    }

    /**
     * Starts game for the complete room
     * @param {sting} code of room
     * @param {string} socketId 
     */
    public static async startGame(code: string, socketId: string) {
        if (!await this.isAdmin(socketId, code))
            throw new Error("Game can only be started by admins!");
        const room = (await Models.Rooms.findOne({ code }))!;
        room.state = RoomStateEnum.TABLE;
        //ToDo more changes depending on game, add validation for number of users, ...
        room.save();
        ClientConnector.emitToRoom(code, SocketServerEvents.ChangeGame, { state: room.state });
    }

    /**
     * Stops a game for the complete room
     * @param {sting} code of room
     * @param {string} socketId 
     */
    public static async stopGame(code: string, socketId: string) {
        if (!await this.isAdmin(socketId, code))
            throw new Error("Game can only be stopped by admins!");
        const room = (await Models.Rooms.findOne({ code }))!;
        room.state = RoomStateEnum.LOBBY;
        //ToDo more changes depending on game, add validation for number of users, ...
        room.save();
        ClientConnector.emitToRoom(code, SocketServerEvents.ChangeGame, { state: room.state });
    }

}
