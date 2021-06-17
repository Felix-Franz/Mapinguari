import CardType from "./CardType";
import MeetingType from "./MeetingType";
import PlayerType from "./PlayerType";
import RoomStateEnum from "./RoomStateEnum";

type RoomType = {
    code: string,
	name: string,
	state: RoomStateEnum
	players: PlayerType[],
	cards: CardType[],	//Cards that where selected in a previouse round
	meeting?: MeetingType
}

export default RoomType;