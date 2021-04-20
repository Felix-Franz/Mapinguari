import { FC } from "react";
import { Container } from "reactstrap";
import GameProgress from "./gameprogress/GameProgress";

const Table : FC<{
    roomName: string
}> = ({roomName}) => {

    return <Container fluid className="my-3 text-center">
        <h2>{roomName}</h2>
        <GameProgress round={2} card={3} />
        ToDo!
    </Container>
}

export default Table;