import PlayerMindEnum from "./PlayerMindEnum";
import PlayerRoleEnum from "./PlayerRoleEnum";

type PlayerType = {

	socketId?: string,
	name: string,
	role: PlayerRoleEnum,
	connected: boolean,
	mind?: PlayerMindEnum,
	place?: string
}

export default PlayerType;