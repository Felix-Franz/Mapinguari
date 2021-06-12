enum GameMessageEnum {
    START = "START",
    SELECTCARDFAILED = "SELECTCARDFAILED",
    NEXTROUND = "NEXTROUND"
}

export default GameMessageEnum;

export const GameMessageEnumArray = Object.values(GameMessageEnum);