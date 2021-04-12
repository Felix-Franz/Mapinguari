export enum SocketClientEvents {
    CreateRoom = "CreateRoom",
    CheckRoom = "CheckRoom",
    JoinRoom = "JoinRoom",
    LeaveRoom = "LeaveRoom",
    StartGame = "StartGame"
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
    ChangeGame = "ChangeGame"
};