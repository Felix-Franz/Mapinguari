import { Model } from "mongoose";
import { Logger } from "../..";
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
            if (room && room.players.length === 0){
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

}
