import { Logger } from "../..";
import GameConfig from "../core/GameConfig";
import AvatarConfigurationType from "../core/types/AvatarConfigurationType";
import CardEnum, { CardEnumArray } from "../core/types/CardEnum";
import GameMessageEnum from "../core/types/GameMessageEnum";
import PlayerRoleEnum from "../core/types/PlayerRoleEnum";
import PlayerType from "../core/types/PlayerType";
import RoomStateEnum from "../core/types/RoomStateEnum";
import RoomType from "../core/types/RoomType";
import { SocketServerEvents } from "../core/types/SocketEventsEnum";
import ClientConnector from "./ClientConnector";
import GameManagerUtil from "./GameManagerUtil";
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
     * @param {string} name room nam
     * @returns {string} roomId of the new room
     */
    public static async createRoom(name: string): Promise<string> {
        const code = await Generator.generateRoomCode();
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
            const inTurn = false;
            room.players.push({
                socketId,
                name,
                avatar,
                role,
                connected,
                inTurn
            });
            ClientConnector.emitToRoom(code, SocketServerEvents.PlayerJoined, { name, avatar, role, connected, inTurn });
        } else if (!room.players[playerIndex]?.connected) { //player name exists but is disconnected
            const role = room!.players[playerIndex].role;
            const cards = room!.players[playerIndex].cards;
            const connected = true;
            const inTurn = false;
            room!.players[playerIndex] = {
                socketId,
                name,
                avatar,
                role,
                cards,
                connected,
                inTurn
            }
            ClientConnector.emitToRoom(code, SocketServerEvents.PlayerReconnected, {
                name, avatar, role, connected, inTurn, cards: cards?.map(c => {
                    if (!c.visible)
                        c.type = CardEnum.UNKNOWN;
                    return c;
                })
            });
        } else    //player name exists but is still connected
            throw new Error("Player with this name is already connected!");

        room.save();

        return {
            code: room!.code,
            name: room!.name,
            state: room!.state,
            players: GameManagerUtil.hidePlayerData(room.players, playerIndex === -1 ? room!.players[room.players.length - 1] : room!.players[playerIndex]),
            cards: room!.cards,
            meeting: room!.meeting
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
                ClientConnector.emitToRoom(r.code, SocketServerEvents.PlayerDisconnected, {
                    name: r.players[playerIndex].name, avatar: r.players[playerIndex].avatar, role: r.players[playerIndex].role, connnected: false, inTurn: r.players[playerIndex].inTurn, cards: r.players[playerIndex].cards?.map(c => {
                        if (!c.visible)
                            c.type = CardEnum.UNKNOWN;
                        return c;
                    })
                });
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
        ClientConnector.emitToRoom(code, SocketServerEvents.PlayerLeft, { name: oldPlayer.name, avatar: oldPlayer.avatar });
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
        room.state = RoomStateEnum.PROGRESS;
        room.cards = [];
        Generator.generateMinds(room.players.length).forEach((m, i) => room.players[i].mind = m);
        Generator.shuffleCards(room.players.length).forEach((c, i) => room.players[i].cards = c);
        const playerInTurn = Generator.selectRandomStartPlayer(room.players);
        room.players.forEach(p => p.inTurn = p.name === playerInTurn.name);

        room.players.forEach(p => ClientConnector.emitToSocket(p.socketId!, SocketServerEvents.ChangeGame, {
            message: GameMessageEnum.START,
            state: room.state,
            players: GameManagerUtil.hidePlayerData(room.players, p),
            cards: room.cards
        }));
        room.save();
    }

    /**
     * Lets user select a card
     * @param {string} code of room
     * @param {string} socketId of player that selects the card
     * @param {PlayerType} player player that has selected card
     * @param {number} cardIndex index of selected card
     */
    public static async selectCard(code: string, socketId: string, player: PlayerType, cardIndex: number) {
        const room = (await Models.Rooms.findOne({ code }))!;
        const selectingPlayerIndex = room.players.findIndex(p => p.socketId === socketId && p.inTurn === true);
        if (selectingPlayerIndex === -1)
            throw new Error("User is not in turn!");

        const playerIndex = room.players.findIndex(p => p.name === player.name);
        if (room.players[playerIndex].cards![cardIndex].visible)
            throw new Error("Card already selected");
        room.players[playerIndex].cards![cardIndex].visible = true;
        room.players[selectingPlayerIndex].inTurn = false;
        room.players[playerIndex].inTurn = true;

        // shuffle cards if round is over
        const playerCards = room.players
            .map(p => p.cards)
            .reduce((prev, c) => prev!.concat(c!), [])!;
        const roundFinished = playerCards
            .filter(c => c.visible === true)
            .length >= room.players.length;
        if (roundFinished) {
            room.cards = room.cards.concat(playerCards.filter(c => c.visible === true));
            Generator.shuffleCards(room.players.length, playerCards.filter(c => c.visible === false).map(c => c.type)).forEach((c, i) => room.players[i].cards = c);
        }

        // check if bad won because of time
        if (room.cards.length >= room.players.length * GameConfig.rounds)
            room.state = RoomStateEnum.BADWON;

        // check if any team won because of cards
        if (playerCards.filter(c => c.type === CardEnum.GOOD && !c.visible).length === 0)
            room.state = RoomStateEnum.GOODWON;
        if (playerCards.filter(c => c.type === CardEnum.BAD && !c.visible).length === 0)
            room.state = RoomStateEnum.BADWON;

        if (room.state === RoomStateEnum.GOODWON || room.state === RoomStateEnum.BADWON)
            room.players[playerIndex].inTurn = false;


        room.players.forEach(p => ClientConnector.emitToSocket(p.socketId!, SocketServerEvents.ChangeGame, {
            state: room.state,
            message: (room.state !== RoomStateEnum.GOODWON && room.state !== RoomStateEnum.BADWON && roundFinished) ? GameMessageEnum.NEXTROUND : undefined,
            players: GameManagerUtil.hidePlayerData(room.players, p, room.state === RoomStateEnum.GOODWON || room.state === RoomStateEnum.BADWON),
            cards: room.cards
        }));
        room.save();
    }

    /**
     * Changes meeting
     * @param {string} code roomCode
     * @param {string} sockeId of client
     * @param {boolean} enableMeeting should meeting be enabled
     */
    public static async changeMeeting(code: string, socketId: string, enableMeeting: boolean) {
        if (!await this.isAdmin(socketId, code))
            throw new Error("Meeting can only be changed by admins!");
        const room = (await Models.Rooms.findOne({ code }))!;

        if (enableMeeting) {
            room!.meeting = Generator.generateMeeting(code);
        }
        else {
            room.meeting = undefined
        }

        ClientConnector.emitToRoom(code, SocketServerEvents.MeetingChanged, room!.meeting);
        await room.save()
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
        room.players = room.players.map(p => {
            delete p.mind;
            p.inTurn = false;
            p.cards = [];
            return p;
        });
        room.cards = [];
        room.save();
        ClientConnector.emitToRoom(code, SocketServerEvents.ChangeGame, {
            state: room.state,
            cards: room!.cards,
            players: room!.players.map(p => {
                return {
                    name: p.name,
                    avatar: p.avatar,
                    role: p.role,
                    connected: p.connected,
                    inTurn: p.inTurn,
                    cards: p.cards
                };
            })
        });
    }

}
