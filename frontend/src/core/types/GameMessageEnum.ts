enum GameMessageEnum {
    START = "START",
    SELECTEDGOOD = "SELECTEDGOOD",
    SELECTEDBAD = "SELECTEDBAD",
    SELECTEDNEUTRAL = "SELECTEDNEUTRAL",
    SELECTCARDFAILED = "SELECTCARDFAILED",
    DAY1OVER = "DAY1OVER",
    DAY2OVER = "DAY2OVER",
    DAY3OVER = "DAY3OVER"
}

export default GameMessageEnum;

export const GameMessageEnumArray = Object.values(GameMessageEnum);