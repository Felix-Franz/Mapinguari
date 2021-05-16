import { FC } from "react";
import { Container } from "reactstrap";
import GameProgress from "./gameprogress/GameProgress";
import GamePlayer from "./gameplayer/GamePlayer";
import CardEnum from "../../../core/types/CardEnum";
import PlayerType from "../../../core/types/PlayerType";

const Table: FC<{
    roomName: string,
    players: PlayerType[]
}> = ({ roomName, players }) => {

    return <Container fluid className="my-3 text-center">
        <h2>{roomName}</h2>
        <GameProgress round={2} card={3} />

        {players.map((p, i) => 
            <GamePlayer player={p} cards={[CardEnum.EMPTY, CardEnum.GOOD, CardEnum.NEUTRAL, CardEnum.BAD, CardEnum.EMPTY]} onCardClick={(player, cardIndex) => console.log(player.name + " " + cardIndex)} />
        )}
        ToDo!
    </Container>
}

export default Table;