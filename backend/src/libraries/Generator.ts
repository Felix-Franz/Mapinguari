import Models from "./Models";

export default class Generator {

    public static async generateRooomCode(): Promise<string> {
        let code: string;
        do {
            code = Math.floor(Math.random() * Math.pow(10, 8)).toString();
        } while (await Models.Rooms.exists({ code }))
        return code;
    }
}