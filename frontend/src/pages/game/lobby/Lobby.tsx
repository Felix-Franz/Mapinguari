import { faClipboard, faPaperPlane, faPhone, faPhoneSlash, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Alert, Button, ButtonGroup, Container } from "reactstrap";
import GameConfig from "../../../core/GameConfig";
import MeetingType from "../../../core/types/MeetingType";
import PlayerRoleEnum from "../../../core/types/PlayerRoleEnum";
import PlayerType from "../../../core/types/PlayerType";
import { SocketClientEvents, SocketServerEvents } from "../../../core/types/SocketEventsEnum";
import SocketClient from "../../../libraries/SocketClient";
import Story from "../../../components/Story";

const Lobby: FC<{
    roomName: string,
    roomCode: string,
    me: string,
    players: PlayerType[],
    meeting?: MeetingType
}> = ({ roomName, roomCode, me, players, meeting }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        SocketClient.on(SocketServerEvents.StartGameFailed, () => {
            toast.error(t("Game.Lobby.StartFailed"));
            setLoading(false);
        });
        SocketClient.on(SocketServerEvents.MeetingChangedFailed, () => {
            toast.error(t("Game.Lobby.MeetingChangedFailed"));
        });

        return () => {
            SocketClient.off(SocketServerEvents.StartGameFailed);
            SocketClient.off(SocketServerEvents.MeetingChangedFailed);
        };
    });

    const getCopyAndShare = (text: string) => <ButtonGroup className="ml-2">
        <Button color="primary" size="sm" outline
            onClick={() => navigator.clipboard.writeText(text).then(() => toast.info(`✔️ ${t("Game.Lobby.Copied")}`)).catch(() => toast.error(t("Game.Lobby.CopyFailed")))}>
            <FontAwesomeIcon icon={faClipboard} />
        </Button>
        <Button color="primary" size="sm" outline
            onClick={() => navigator.share({
                title: "Mapinguari",
                text
            }).then(() => toast.info(t("Game.Lobby.Shared"))).catch(() => toast.error(t("Game.Lobby.ShareFailed")))}>
            <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
    </ButtonGroup>

    const startGame = () => {
        setLoading(true);
        SocketClient.emit(SocketClientEvents.StartGame);
    }

    const leaveRoom = () => {
        setLoading(true);
        SocketClient.emit(SocketClientEvents.LeaveRoom, me)
    }

    return <Container fluid className="my-3 text-center">
        <h2>{roomName}</h2>
        <h5>{t("Game.Lobby.Waiting")}</h5>
        <div className="mt-5">
            <h6>{t("Game.Lobby.Join")}</h6>
            <div>
                {t("Game.Lobby.Link")}
                <var className="text-primary ml-1 pre-wrap user-select-all">{window.location.toString()}</var>
                {getCopyAndShare(window.location.toString())}
            </div>
            <div>
                {t("Game.Lobby.Code")}
                <var className="text-primary ml-1 pre-wrap user-select-all">{roomCode}</var>
                {getCopyAndShare(roomCode)}
            </div>
            <div className="mt-3">
                {t("Game.Lobby.Welcome Message")}
                {getCopyAndShare(t("Game.Lobby.Welcome Message Text", { link: window.location.toString() }))}
                <br />
                <var className="text-primary pre-wrap user-select-all">{t("Game.Lobby.Welcome Message Text", { link: window.location.toString() })}</var>
            </div  >
            <div className={players.find(p => p.name === me)?.role === PlayerRoleEnum.ADMIN ? "mt-5" : "d-none"}>
                <Alert color="danger" isOpen={players.filter(p => !p.connected).length > 0}>
                    {t("Game.Lobby.StartPlayerDisconnected", { names: players.filter(p => !p.connected).map(p => p.name).join(", ") })}
                </Alert>
                <Alert color="danger" isOpen={players.length < GameConfig.minPlayers || players.length > GameConfig.maxPlayers}>
                    {t("Game.Lobby.StartWrongPlayerCount", { minPlayers: GameConfig.minPlayers, maxPlayers: GameConfig.maxPlayers })}
                </Alert>
                <Button color="primary" onClick={startGame} outline disabled={loading || players.filter(p => !p.connected).length > 0 || players.length < GameConfig.minPlayers || players.length > GameConfig.maxPlayers}>
                    <span className="mr-2">🚀</span>
                    {t("Game.Lobby.Start")}
                </Button>
                <br />
                <Button className="mt-3" color="primary" onClick={() => SocketClient.emit(SocketClientEvents.ChangeMeeting, !meeting)} outline>
                    <FontAwesomeIcon className="mr-2" icon={meeting ? faPhoneSlash : faPhone} />
                    {meeting ? t("Game.Lobby.DisableMeeting") : t("Game.Lobby.EnableMeeting")}
                </Button>
            </div>
            <div className="mt-5">
                <Button color="secondary" onClick={leaveRoom} disabled={loading} outline>
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    {t("Game.Lobby.Leave")}
                </Button>
            </div>
            <Story className="mt-5 mt-5 border border-primary rounded w-75 mx-auto p-2" />
        </div>
    </Container >
}

export default Lobby;
