import PlayerMindEnum from "./PlayerMindEnum";
import PlayerRoleEnum from "./PlayerRoleEnum";
import AvatarConfigurationType from "./AvatarConfigurationType";
import CardType from "./CardType";

type PlayerType = {

	socketId?: string,
	name: string,
	avatar: AvatarConfigurationType,
	role: PlayerRoleEnum,
	connected: boolean,
	mind?: PlayerMindEnum,
	cards?: CardType[],
	inTurn: boolean
}

export default PlayerType;