import { FC } from "react";
import { Container } from "reactstrap";
import PlayerType from "../../../core/types/PlayerType";
import GamePlayer from "./gameplayer/GamePlayer";
import GameProgress from "./gameprogress/GameProgress";

const Table: FC<{
    roomName: string,
    players: PlayerType[],
    me: string
}> = ({ roomName, players, me}) => {

    return <Container fluid className="my-3 text-center">
        <h2>{roomName}</h2>
        <GameProgress round={2} card={3} />

        {players.map((p, i) => 
            <GamePlayer me={me} className="mt-1" player={p} onCardClick={(player, cardIndex) => console.log(player.name + " " + cardIndex)} key={i} />
        )}
        ToDo!
    </Container>
}

export default Table;