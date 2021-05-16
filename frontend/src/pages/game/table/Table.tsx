import { FC } from "react";
import { Container } from "reactstrap";
import GameProgress from "./gameprogress/GameProgress";
import GamePlayer from "./gameplayer/GamePlayer";
import ItemEnum from "../../../core/types/ItemEnum";

const Table: FC<{
    roomName: string
}> = ({ roomName }) => {

    return <Container fluid className="my-3 text-center">
        <h2>{roomName}</h2>
        <GameProgress round={2} card={3} />
        <GamePlayer playerName="TestPlayer 1" cards={[ItemEnum.EMPTY, ItemEnum.GOOD, ItemEnum.NEUTRAL, ItemEnum.BAD, ItemEnum.EMPTY]} onCardClick={(playerName, cardIndex) => console.log(playerName + " " + cardIndex)} />
        <GamePlayer playerName="TestPlayer 2" playerSTurn={true} cards={[ItemEnum.EMPTY, ItemEnum.GOOD, ItemEnum.NEUTRAL, ItemEnum.BAD, ItemEnum.EMPTY]} onCardClick={(playerName, cardIndex) => console.log(playerName + " " + cardIndex)} />
        <GamePlayer playerName="TestPlayer 3" cards={[ItemEnum.EMPTY, ItemEnum.GOOD, ItemEnum.NEUTRAL, ItemEnum.BAD, ItemEnum.EMPTY]} onCardClick={(playerName, cardIndex) => console.log(playerName + " " + cardIndex)} />
        ToDo!
    </Container>
}

export default Table;