import { GameManager } from "../..";
import GameConfig from "../core/GameConfig";
import CardEnum from "../core/types/CardEnum";
import PlayerMindEnum from "../core/types/PlayerMindEnum";
import Models from "./Models";

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
    public static shuffleCards(playerCount: number, unshuffledCards?: CardEnum[]): CardEnum[][] {
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

        const cards: CardEnum[] = [];
        while (availableCards.length > 0) {
            const randomIndex = Math.floor(availableCards.length * Math.random());
            cards.push(availableCards[randomIndex]);
            availableCards = availableCards.filter((m, i) => i !== randomIndex);
        }

        const playerCards: CardEnum[][] = [];
        const playerCardCount = cards.length / playerCount;
        console.log(playerCardCount)
        for (let j = 0; j < playerCount; ++j)
            playerCards.push(cards.slice(j * playerCardCount, (j + 1)* playerCardCount));
            
        return playerCards;
    }
}