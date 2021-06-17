export enum SocketClientEvents {
    CreateRoom = "CreateRoom",
    CheckRoom = "CheckRoom",
    JoinRoom = "JoinRoom",
    LeaveRoom = "LeaveRoom",
    StartGame = "StartGame",
    StopGame = "StopGame",
    SelectCard = "SelectCard",
    ChangeMeeting = "ChangeMeeting"
};

export enum SocketServerEvents {
    RoomCreated = "RoomCreated",
    RoomChecked = "RoomChecked",
    RoomJoined = "RoomJoined",
    RoomLeft = "RoomLeft",
    PlayerJoined = "PlayerJoined",
    PlayerReconnected = "PlayerReconnected",
    PlayerDisconnected = "PlayerDisconnected",
    PlayerRoleChanged = "PlayerRoleChanged",
    PlayerLeft = "PlayerLeft",
    StartGameFailed = "StartGameFailed",
    ChangeGame = "ChangeGame",
    StopGameFailed = "StopGameFailed",
    MeetingChanged = "MeetingChanged",
    MeetingChangedFailed = "MeetingChangedFailed"
};