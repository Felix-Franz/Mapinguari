import PlayerMindEnum from "./PlayerMindEnum";
import PlayerRoleEnum from "./PlayerRoleEnum";
import AvatarConfigurationType from "./AvatarConfigurationType";
import CardEnum from "./CardEnum";

type PlayerType = {

	socketId?: string,
	name: string,
	avatar: AvatarConfigurationType,
	role: PlayerRoleEnum,
	connected: boolean,
	mind?: PlayerMindEnum,
	cards?: CardEnum[]
}

export default PlayerType;