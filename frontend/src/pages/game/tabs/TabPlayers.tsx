import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Badge, Container, ListGroup, ListGroupItem } from "reactstrap";
import PlayerRoleEnum from "../../../core/types/PlayerRoleEnum";
import PlayerType from "../../../core/types/PlayerType";

const TabPlayers: FC<{ players: PlayerType[], me: string, roomCode: string }> = ({ players, me, roomCode }) => {
    const { t } = useTranslation();

    return <Container fluid className="text-center my-3">
        <h2>{t("Game.PlayerTab.Title")}</h2>
        <Alert color="secondary" className={players.filter(p => !p.connected).length > 0 ? "" : "d-none"}>
            {t("Game.PlayerTab.RejoinAlert", {names: players.filter(p => !p.connected).map(p => p.name).join(","), roomCode, link: window.location.toString()})}
            </Alert>
        <ListGroup flush>
            {
                players.map((p, i) =>
                    <ListGroupItem key={i}>
                        {p.name}
                        <Badge className={`ml-2 ${p.name === me ? "" : "d-none"}`} color="primary">{t("Game.PlayerTab.Me")}</Badge>
                        <Badge className={`ml-2 ${p.role === PlayerRoleEnum.ADMIN ? "" : "d-none"}`} color="primary">{t("Game.PlayerTab.Admin")}</Badge>
                        <Badge className={`ml-2 ${!p.connected ? "" : "d-none"}`} color="secondary">{t("Game.PlayerTab.Disconnected")}</Badge>
                    </ListGroupItem>
                )
            }
        </ListGroup>
    </Container>
};

export default TabPlayers;