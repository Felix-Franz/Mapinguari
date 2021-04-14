import PlayerMindEnum from "./PlayerMindEnum";
import PlayerRoleEnum from "./PlayerRoleEnum";
import AvatarConfigurationType from "./AvatarConfigurationType";

type PlayerType = {

	socketId?: string,
	name: string,
	avatar: AvatarConfigurationType,
	role: PlayerRoleEnum,
	connected: boolean,
	mind?: PlayerMindEnum,
	place?: string
}

export default PlayerType;