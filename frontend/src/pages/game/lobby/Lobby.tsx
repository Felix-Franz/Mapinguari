import { faClipboard, faPaperPlane, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Container } from "reactstrap";
import RoomStateEnum from "../../../core/types/RoomStateEnum";
import { SocketClientEvents, SocketServerEvents } from "../../../core/types/SocketEventsEnum";
import SocketClient from "../../../libraries/SocketClient";

const Lobby: FC<{
    setState: (state: RoomStateEnum) => void,
    roomName: string,
    roomCode: string,
    me: string
}> = ({ setState, roomName, roomCode, me }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        SocketClient.on(SocketServerEvents.StartGameFailed, () => {
            toast.error(t("Game.Lobby.StartFailed"));
            setLoading(false);
        });

        return () => {
            SocketClient.off(SocketServerEvents.StartGameFailed);
        };
    });

    const getCopyAndShare = (text: string) => <ButtonGroup className="ml-2">
        <Button color="primary" size="sm"
            onClick={() => navigator.clipboard.writeText(text).then(() => toast.info(t("Game.Lobby.Copied"))).catch(() => toast.error(t("Game.Lobby.CopyFailed")))}>
            <FontAwesomeIcon icon={faClipboard} />
        </Button>
        <Button color="primary" size="sm"
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
                <var className="text-primary ml-1 pre-wrap">{window.location.toString()}</var>
                {getCopyAndShare(window.location.toString())}
            </div>
            <div>
                {t("Game.Lobby.Code")}
                <var className="text-primary ml-1 pre-wrap">{roomCode}</var>
                {getCopyAndShare(roomCode)}
            </div>
            <div className="mt-3">
                {t("Game.Lobby.Welcome Message")}
                {getCopyAndShare(t("Game.Lobby.Welcome Message Text", { link: window.location.toString() }))}
                <br />
                <var className="text-primary pre-wrap">{t("Game.Lobby.Welcome Message Text", { link: window.location.toString() })}</var>
                <div className="mt-5">
                    <Button color="primary" onClick={startGame} disabled={loading}>
                        <span className="mr-2">🚀</span>
                        {t("Game.Lobby.Start")}
                    </Button>
                </div>
            </div  >
            <div className="mt-5">
                <Button color="secondary" onClick={leaveRoom} disabled={loading}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    {t("Game.Lobby.Leave")}
                </Button>
            </div>
        </div>
    </Container >
}

export default Lobby;