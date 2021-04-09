import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Badge, Button, Container, ListGroup, ListGroupItem } from "reactstrap";
import AlertModal from "../../../components/AlertModal";
import PlayerRoleEnum from "../../../core/types/PlayerRoleEnum";
import PlayerType from "../../../core/types/PlayerType";
import { SocketClientEvents } from "../../../core/types/SocketEventsEnum";
import SocketClient from "../../../libraries/SocketClient";

const TabPlayers: FC<{ players: PlayerType[], me: string, roomCode: string, allowKick: boolean }> = ({ players, me, roomCode, allowKick }) => {
    const { t } = useTranslation();

    const kick = (player: PlayerType) => {
        AlertModal.show({
            header: t("Game.PlayerTab.KickHeader"),
            message: t("Game.PlayerTab.KickMessage", {name: player.name}),
            buttons: [{
                text: t("General.Yes"),
                handler: () => SocketClient.emit(SocketClientEvents.LeaveRoom, { code: roomCode, name: player.name })
            }, t("General.No")]
        })
    }

    return <Container fluid className="text-center my-3">
        <h2>{t("Game.PlayerTab.Title")}</h2>
        <Alert color="secondary" className={players.filter(p => !p.connected).length > 0 ? "" : "d-none"}>
            {t("Game.PlayerTab.RejoinAlert", { names: players.filter(p => !p.connected).map(p => p.name).join(","), roomCode, link: window.location.toString() })}
        </Alert>
        <ListGroup flush>
            {
                players.map((p, i) =>
                    <ListGroupItem key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {p.name}
                        <Badge className={`ml-2 ${p.name === me ? "" : "d-none"}`} color="primary">{t("Game.PlayerTab.Me")}</Badge>
                        <Badge className={`ml-2 ${p.role === PlayerRoleEnum.ADMIN ? "" : "d-none"}`} color="primary">{t("Game.PlayerTab.Admin")}</Badge>
                        <Badge className={`ml-2 ${!p.connected ? "" : "d-none"}`} color="secondary">{t("Game.PlayerTab.Disconnected")}</Badge>
                        <Button style={{ fontSize: 15 }} className={`ml-2 py-0 px-1 ${allowKick ? "" : "d-none"}`} onClick={() => kick(p)}>
                            <FontAwesomeIcon icon={faTrash} className="mr-1" />
                            {t("Game.PlayerTab.Kick")}
                        </Button>
                    </ListGroupItem>
                )
            }
        </ListGroup>
    </Container >
};

export default TabPlayers;