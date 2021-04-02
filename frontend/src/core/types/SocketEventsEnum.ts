export enum SocketClientEvents {
    CreateRoom = "CreateRoom",
    CheckRoom = "CheckRoom",
    JoinRoom = "JoinRoom",
};

export enum SocketServerEvents {
    RoomCreated = "RoomCreated",
    RoomChecked = "RoomChecked",
    RoomJoined = "RoomJoined",
    PlayerJoined = "PlayerJoined",
    PlayerReconnected = "PlayerReconnected",
    PlayerDisconnected = "PlayerDisconnected",
};