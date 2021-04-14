import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Badge, Button, Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import AlertModal from "../../../components/AlertModal";
import Avatar from "../../../components/avatar/Avatar";
import PlayerRoleEnum from "../../../core/types/PlayerRoleEnum";
import PlayerType from "../../../core/types/PlayerType";
import { SocketClientEvents } from "../../../core/types/SocketEventsEnum";
import SocketClient from "../../../libraries/SocketClient";

const TabPlayers: FC<{ players: PlayerType[], me: string, roomCode: string, allowKick: boolean }> = ({ players, me, roomCode, allowKick }) => {
    const { t } = useTranslation();

    const kick = (player: PlayerType) => {
        AlertModal.show({
            header: t("Game.Tabs.Player.KickHeader"),
            message: t("Game.Tabs.Player.KickMessage", { name: player.name }),
            buttons: [{
                text: t("General.Yes"),
                handler: () => SocketClient.emit(SocketClientEvents.LeaveRoom, { code: roomCode, name: player.name })
            }, t("General.No")]
        })
    }

    return <Container fluid className="text-center my-3">
        <h2>{t("Game.Tabs.Player.Title")}</h2>
        <Alert color="secondary" className={players.filter(p => !p.connected).length > 0 ? "" : "d-none"}>
            {t("Game.Tabs.Player.RejoinAlert", { names: players.filter(p => !p.connected).map(p => p.name).join(","), roomCode, link: window.location.toString() })}
        </Alert>
        <ListGroup flush>
            {
                players.map((p, i) =>
                    <ListGroupItem key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Row className="w-100 align-items-center">
                            <Col xs="12" sm="4" className="mb-1 mb-sm-0">
                                <Avatar configuration={p.avatar} className="m-auto m-sm-0 mr-sm-2" style={{ width: "5em" }} />
                            </Col>
                            <Col xs="12" sm="5">
                                {p.name}
                                <Badge className={`ml-2 ${p.name === me ? "" : "d-none"}`} color="primary">{t("Game.Tabs.Player.Me")}</Badge>
                                <Badge className={`ml-2 ${p.role === PlayerRoleEnum.ADMIN ? "" : "d-none"}`} color="primary">{t("Game.Tabs.Player.Admin")}</Badge>
                                <Badge className={`ml-2 ${!p.connected ? "" : "d-none"}`} color="secondary">{t("Game.Tabs.Player.Disconnected")}</Badge>
                            </Col>
                            <Col xs="12" sm="3">
                                                                <Button style={{ fontSize: 15 }} className={`ml-2 py-0 px-1 ${allowKick ? "" : "d-none"}`} onClick={() => kick(p)}>
                                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
                                    {t("Game.Tabs.Player.Kick")}
                                </Button>
                            </Col>
                        </Row>


                    </ListGroupItem>
                )
            }
        </ListGroup>
    </Container >
};

export default TabPlayers;