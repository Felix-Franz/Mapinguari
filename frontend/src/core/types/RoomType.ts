import ItemEnum from "./ItemEnum";
import PlayerType from "./PlayerType";
import RoomStateEnum from "./RoomStateEnum";

type RoomType = {
    code: string,
	name: string,
	state: RoomStateEnum
	players: PlayerType[],
	places: {
		name: string,
		item: ItemEnum
	}[],
}

export default RoomType;