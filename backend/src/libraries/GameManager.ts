import Generator from "./Generator";
import Models from "./Models";

export default class GameManager{

    /**
     * Creates a new game
     * @param {string} name room name
     * @returns {string} roomId of the new room
     */
    public static async createGame(name: string) : Promise<string> {
        const code = await Generator.generateRooomCode();
        Models.Rooms.create({
            code,
            name
        });
        return code;
    }

}
