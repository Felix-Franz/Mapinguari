import { FC } from "react";
import { Container } from "reactstrap";
import PlayerType from "../../../core/types/PlayerType";
import RoomStateEnum from "../../../core/types/RoomStateEnum";

const Lobby: FC<{
    setState: (state: RoomStateEnum) => void,
    players: PlayerType[],
    roomName: string,
    roomCode: string
}> = ({ setState, players, roomName, roomCode }) => {
    return <Container fluid>
        <h2>LOBBY: {roomName}</h2>
        <p>Link {window.location.toString()}</p>
        <p>Code: {roomCode}</p>
        <ul>
            {players.map((p, i) => <li key={i}>{p.name} ({p.connected ? "conected" : "not connected"})</li>)}
        </ul>
    </Container>
}

export default Lobby;