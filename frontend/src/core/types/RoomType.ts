import CardEnum from "./CardEnum";
import PlayerType from "./PlayerType";
import RoomStateEnum from "./RoomStateEnum";

type RoomType = {
    code: string,
	name: string,
	state: RoomStateEnum
	players: PlayerType[],
	cards: CardEnum[],	//Cards that where selected in a previouse round
}

export default RoomType;