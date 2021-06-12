enum RoomStateEnum {
    LOBBY = "LOBBY",
    PROGRESS = "PROGRESS",
    GOODWON = "GOODWON",
    BADWON = "BADWON"
}

export default RoomStateEnum;

export const RoomStateEnumArray = Object.values(RoomStateEnum);