import ItemEnum from "./ItemEnum";
import PlayerMindEnum from "./PlayerMindEnum";
import PlayerRoleEnum from "./PlayerRoleEnum";
import RoomStateEnum from "./RoomStateEnum";

type RoomType = {
    id: string,
	name: string,
	state: RoomStateEnum
	players: {
		playerId: string,
		socketId?: string,
		name: string,
		role: PlayerRoleEnum,
		connected: boolean,
		mind: PlayerMindEnum,
		place?: string
	}[],
	places: {
		name: string,
		item: ItemEnum
	}[],
}

export default RoomType;