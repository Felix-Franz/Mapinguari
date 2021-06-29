import { GameManager } from "../..";
import GameConfig from "../core/GameConfig";
import CardEnum from "../core/types/CardEnum";
import PlayerMindEnum from "../core/types/PlayerMindEnum";
import PlayerType from "../core/types/PlayerType";
import CardType from "../core/types/CardType";
import MeetingType from "../core/types/MeetingType";

export default class Generator {

    public static async generateRoomCode(): Promise<string> {
        let code: string;
        do {
            code = Math.floor(Math.random() * Math.pow(10, 8)).toString();
        } while (await GameManager.checkRoom(code))
        return code;
    }

    /**
     * Generates an array of player minds
     * @param {number} playerCount number of players
     * @returns {PlayerMindEnum[]} player minds
     */
    public static generateMinds(playerCount: number): PlayerMindEnum[] {
        const conf = GameConfig.players.find(p => p.playerCount === playerCount);
        if (!conf) throw new Error(`playerCount ${playerCount} is not supported!`);

        let availableMinds: PlayerMindEnum[] = [];
        [PlayerMindEnum.GOOD, PlayerMindEnum.BAD].forEach(mind => {
            for (let i = 0; i < conf[mind]; ++i)
                availableMinds.push(PlayerMindEnum[mind])
        });

        const playerMinds: PlayerMindEnum[] = [];
        for (let j = 0; j < playerCount; ++j) {
            const randomIndex = Math.floor(availableMinds.length * Math.random());
            playerMinds.push(availableMinds[randomIndex]);
            availableMinds = availableMinds.filter((m, i) => i !== randomIndex)
        }

        return playerMinds;
    }

    /**
     * Shuffles cards
     * @param {number} playerCount number of players
     * @param {CardEnum[]} availableCards available non shuffled cards
     * @returns {CardEnum[][]} cards per player
     */
    public static shuffleCards(playerCount: number, unshuffledCards?: CardEnum[]): CardType[][] {
        const conf = GameConfig.cards.find(p => p.playerCount === playerCount);
        if (!conf) throw new Error(`playerCount ${playerCount} is not supported!`);

        let availableCards: CardEnum[] = [];
        if (unshuffledCards && unshuffledCards.length > 0)
            availableCards = unshuffledCards;
        else {
            [CardEnum.NEUTRAL, CardEnum.GOOD, CardEnum.BAD].forEach((mind) => {
                //@ts-ignore
                for (let i = 0; i < conf[mind]; ++i)
                    availableCards.push(CardEnum[mind])
            });
        }

        const cards: CardType[] = [];
        while (availableCards.length > 0) {
            const randomIndex = Math.floor(availableCards.length * Math.random());
            cards.push({
                type: availableCards[randomIndex],
                visible: false
            });
            availableCards = availableCards.filter((m, i) => i !== randomIndex);
        }

        const playerCards: CardType[][] = [];
        const playerCardCount = cards.length / playerCount;
        for (let j = 0; j < playerCount; ++j)
            playerCards.push(cards.slice(j * playerCardCount, (j + 1) * playerCardCount));

        return playerCards;
    }

    /**
     * Selects a random player as start player
     * @param {PlayerType[]} players list of avaliable players
     * @returns {PlayerType} a start player 
     */
    public static selectRandomStartPlayer(players: PlayerType[]): PlayerType {
        const inTurn = Math.floor(players.length * Math.random());
        return players[inTurn];
    }

    /**
     * Generates a random string
     * @param {number} length of random string
     * @param {string} characters possible characters
     * @returns {stirng} random string
     */
    public static generateRandomString(length: number, characters?: string) {
        var result = '';
        if (!characters)
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++)
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        return result;
    }

    /**
     * Generates meeting credentials
     * @param {string} code room code
     * @returns {MeetingType} meeting credentials
     */
    public static generateMeeting(code: string): MeetingType {
        return {
            roomName: `Mapinguari Meeting ${code}`,
            password: this.generateRandomString(20)
        }
    }
}