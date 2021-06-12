import { FC } from "react";
import { Alert, Button, ButtonGroup, Container } from "reactstrap";
import { toast } from "react-toastify";
import PlayerType from "../../../core/types/PlayerType";
import GamePlayer from "./gameplayer/GamePlayer";
import GameProgress from "./gameprogress/GameProgress";
import { useTranslation } from "react-i18next";
import SocketClient from "../../../libraries/SocketClient";
import { SocketClientEvents } from "../../../core/types/SocketEventsEnum";
import CardType from "../../../core/types/CardType";
import RoomStateEnum from "../../../core/types/RoomStateEnum";
import PlayerRoleEnum from "../../../core/types/PlayerRoleEnum";
import GameCard from "./gamecard/GameCard";

const Table: FC<{
    roomName: string,
    players: PlayerType[],
    cards: CardType[],
    me: string,
    state: RoomStateEnum
}> = ({ roomName, players, cards, me, state }) => {
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
        if (player.cards![cardIndex].visible) {
            toast.error(t("Game.Table.CardAlreadyVisible"));
            return;
        }
        SocketClient.emit(SocketClientEvents.SelectCard, { player, cardIndex });
    }
    return <Container fluid className="my-3 text-center">
        <h2>{roomName}</h2>
        <GameProgress cards={cards} players={players} />

        <div className="mt-4 mb-4" style={{ display: [RoomStateEnum.GOODWON, RoomStateEnum.BADWON].includes(state) ? undefined : "none" }}>
            <Alert style={{ display: state === RoomStateEnum.GOODWON ? undefined : "none" }} color="primary" className="mt-2">
                <span className="mr-2">🎉</span>
                {t("Game.GoodWon")}
            </Alert>
            <Alert style={{ display: state === RoomStateEnum.BADWON ? undefined : "none" }} color="secondary" className="mt-2">
                <span className="mr-2">🎉</span>
                {t("Game.BadWon")}
            </Alert>
            <ButtonGroup style={{ display: players.find(p => p.name === me)?.role === PlayerRoleEnum.ADMIN ? undefined : "none" }}>
                <Button color="primary" outline onClick={() => SocketClient.emit(SocketClientEvents.StopGame)}>
                    <span className="mr-2">🛑</span>
                    {t("Game.BackToLobby")}
                </Button>
                <Button color="primary" outline onClick={() => SocketClient.emit(SocketClientEvents.StartGame)}>
                    <span className="mr-2">🚀</span>
                    {t("Game.NewMatch")}
                </Button>
            </ButtonGroup>
        </div>

        <div className="mt-1">
            <h3 className="my-0">{t("Game.Table.Cards")}</h3>
            <p className="mt-0 mb-0 text-muted">{t("Game.Table.CardsDescription")}</p>
            {cards.map((c, i) =>
                <GameCard key={i} size="sm" flipped={true} itemMind={c.type} />
            )}
            <p style={{display: cards.length === 0 ? undefined : "none"}}>
                <span className="mr-2">🚫</span>
                {t("Game.Table.NoCards")}
                </p>
        </div>

        <div className="mt-3">
            <h3 className="my-0">{t("Game.Table.AllDecks")}</h3>
            <p className="mt-0 mb-0 text-muted">{t("Game.Table.AllDecksDescription")}</p>
            {players.map((p, i) =>
                <GamePlayer me={me} className="mt-1" player={p} onCardClick={onCardClick} key={i} cardsAlwaysVisible={[RoomStateEnum.GOODWON, RoomStateEnum.BADWON].includes(state)} />
            )}
        </div>

        <div className="mt-3" style={{ display: [RoomStateEnum.GOODWON, RoomStateEnum.BADWON].includes(state) ? "none" : undefined }}>
            <h3 className="my-0">{t("Game.Table.YourDeck")}</h3>
            <p className="mt-0 mb-0 text-muted">{t("Game.Table.YourDeckDescription")}</p>
            <GamePlayer me={me} className="mt-1" player={players.find(p => p.name === me)!} onCardClick={onCardClick} cardsAlwaysVisible={true} />
        </div >

    </Container>
}

export default Table;