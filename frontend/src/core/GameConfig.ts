import CardEnum from "./types/CardEnum";
import PlayerMindEnum from "./types/PlayerMindEnum";

type GameConfigType = {
    players: {
        playerCount: number,
        [PlayerMindEnum.GOOD]: number,
        [PlayerMindEnum.BAD]: number
    }[],
    cards: {
        playerCount: number,
        [CardEnum.NEUTRAL]: number,
        [CardEnum.GOOD]: number,
        [CardEnum.BAD]: number
    }[],
    rounds: number
}

const GameConfig: GameConfigType = {
    players: [
        {
            playerCount: 4,
            [PlayerMindEnum.GOOD]: 3,
            [PlayerMindEnum.BAD]: 2
        },
        {
            playerCount: 5,
            [PlayerMindEnum.GOOD]: 4,
            [PlayerMindEnum.BAD]: 2
        },
        {
            playerCount: 6,
            [PlayerMindEnum.GOOD]: 4,
            [PlayerMindEnum.BAD]: 2
        },
        {
            playerCount: 7,
            [PlayerMindEnum.GOOD]: 5,
            [PlayerMindEnum.BAD]: 3
        },
        {
            playerCount: 8,
            [PlayerMindEnum.GOOD]: 6,
            [PlayerMindEnum.BAD]: 3
        }
    ],
    cards: [
        {
            playerCount: 4,
            [CardEnum.NEUTRAL]: 15,
            [CardEnum.GOOD]: 4,
            [CardEnum.BAD]: 1,
        },
        {
            playerCount: 5,
            [CardEnum.NEUTRAL]: 19,
            [CardEnum.GOOD]: 5,
            [CardEnum.BAD]: 1,
        },
        {
            playerCount: 6,
            [CardEnum.NEUTRAL]: 23,
            [CardEnum.GOOD]: 6,
            [CardEnum.BAD]: 1,
        },
        {
            playerCount: 7,
            [CardEnum.NEUTRAL]: 27,
            [CardEnum.GOOD]: 7,
            [CardEnum.BAD]: 1,
        },
        {
            playerCount: 8,
            [CardEnum.NEUTRAL]: 31,
            [CardEnum.GOOD]: 8,
            [CardEnum.BAD]: 1,
        }
    ],
    rounds: 4
}

export default GameConfig;