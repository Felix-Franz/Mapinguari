import { faClipboard, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Button, ButtonGroup, Container } from "reactstrap";
import RoomStateEnum from "../../../core/types/RoomStateEnum";

const Lobby: FC<{
    setState: (state: RoomStateEnum) => void,
    roomName: string,
    roomCode: string
}> = ({ setState, roomName, roomCode }) => {
    const { t } = useTranslation();

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
            </div>
        </div>
    </Container>
}

export default Lobby;