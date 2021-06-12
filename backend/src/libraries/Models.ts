import mongoose, { Document, Model, Schema } from "mongoose";
import { Logger } from "../..";
import CardEnum, { CardEnumArray } from "../core/types/CardEnum";
import { PlayerMindEnumArray } from "../core/types/PlayerMindEnum";
import { PlayerRoleEnumArray } from "../core/types/PlayerRoleEnum";
import RoomStateEnum, { RoomStateEnumArray } from "../core/types/RoomStateEnum";
import RoomType from "../core/types/RoomType";
import { LEVELS } from "./Logger";

export default class Models {
    private static initialized: boolean = false;
    private static rooms: Model<RoomType & Document>;

    public static initialize() {
        if (this.initialized)
            return;
        this.initialized = true;

        const cardSchema = new Schema({
            type: {
                type: String,
                enum: CardEnumArray,
                required: true,
                default: CardEnum.UNKNOWN
            },
            visible: {
                type: Boolean,
                required: true
            }
        });
        const playerSchema = new Schema({
            socketId: String,
            name: {
                type: String,
                required: true
            },
            avatar: {
                type: Object,
                required: true
            },
            role: {
                type: String,
                enum: PlayerRoleEnumArray,
                required: true
            },
            connected: {
                type: Boolean,
                required: true
            },
            mind: {
                type: String,
                enum: PlayerMindEnumArray
            },
            cards: [cardSchema],
            inTurn: Boolean
        });
        const roomSchema = new Schema({
            code: {
                type: String,
                required: true,
                unique: true
            },
            name: {
                type: String
            },
            state: {
                type: String,
                enum: RoomStateEnumArray,
                required: true,
                default: RoomStateEnum.LOBBY
            },
            players: [playerSchema],
            cards: [cardSchema]
        });
        this.rooms = mongoose.model<RoomType & Document>("Rooms", roomSchema)

        Logger.log(LEVELS.silly, "Database models created!");
    }

    public static get Rooms() {
        return this.rooms;
    }
}