import mongoose, { Model, Schema, Document } from "mongoose";
import { Logger } from "../..";
import { LEVELS } from "./Logger";
import RoomType from "../core/types/RoomType";
import { PlayerRoleEnumArray } from "../core/types/PlayerRoleEnum";
import { PlayerMindEnumArray } from "../core/types/PlayerMindEnum";
import { ItemEnumArray } from "../core/types/ItemEnum";
import { RoomStateEnumArray } from "../core/types/RoomStateEnum";

export default class Models {
    private static initialized: boolean = false;
    private static rooms: Model<RoomType & Document>;

    public static initialize() {
        if (this.initialized)
            return;
        this.initialized = true;

        const playersSchema = new Schema({
            playerId: {
                type: String,
                required: true
            },
            socketId: String,
            name: {
                type: String,
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
                enum: PlayerMindEnumArray,
                required: true
            },
            place: String
        });
        const placesSchema = new Schema({
            name: {
                type: String,
                required: true
            },
            item: {
                type: String,
                enum: ItemEnumArray,
                required: true
            },
        });
        const roomSchema = new Schema({
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            state: {
                type: String,
                enum: RoomStateEnumArray,
                required: true
            },
            players: [playersSchema],
            places: [placesSchema]
        });
        this.rooms = mongoose.model<RoomType & Document>("SaveGame", roomSchema)

        Logger.log(LEVELS.silly, "Database models created!");
    }

    public static get Rooms() {
        return this.rooms;
    }
}