import ItemEnum from "./ItemEnum";
import PlayerType from "./PlayerType";
import RoomStateEnum from "./RoomStateEnum";

type RoomType = {
    code: string,
	name: string,
	state: RoomStateEnum
	players: PlayerType[],
	cards: ItemEnum[],
}

export default RoomType;