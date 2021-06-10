import { FC } from "react";
import { Container } from "reactstrap";
import { toast } from "react-toastify";
import PlayerType from "../../../core/types/PlayerType";
import GamePlayer from "./gameplayer/GamePlayer";
import GameProgress from "./gameprogress/GameProgress";
import { useTranslation } from "react-i18next";

const Table: FC<{
    roomName: string,
    players: PlayerType[],
    me: string
}> = ({ roomName, players, me }) => {
    const { t } = useTranslation();

    const onCardClick = (player: PlayerType, cardIndex: number) => {
        if (!players.find(p => p.name === me)?.inTurn) {
            toast.error(t("Game.Table.NotYourTurn"));
            return;
        }
        if (player.name === me) {
            toast.error(t("Game.Table.DontClickOnYourself"));
            return;
        }
        console.log(player.name + " " + cardIndex)
    }

    return <Container fluid className="my-3 text-center">
        <h2>{roomName}</h2>
        <GameProgress round={2} card={3} />

        {players.map((p, i) =>
            <GamePlayer me={me} className="mt-1" player={p} onCardClick={onCardClick} key={i} />
        )}
        ToDo!
    </Container>
}

export default Table;