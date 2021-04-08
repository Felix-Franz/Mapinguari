import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, Container, Input, Spinner } from "reactstrap";
import PlayerType from "../../../core/types/PlayerType";
import RoomStateEnum from "../../../core/types/RoomStateEnum";
import RoomType from "../../../core/types/RoomType";
import { SocketClientEvents, SocketServerEvents } from "../../../core/types/SocketEventsEnum";
import SocketClient from "../../../libraries/SocketClient";

const Join: FC<{
    setPlayers: (players: PlayerType[]) => void,
    setRoomName: (name: string) => void,
    setRoomCode: (code: string) => void,
    setMe: (name: string) => void,
    setState: (state: RoomStateEnum) => void,
    code: string
}> = ({ setPlayers, setRoomName, setRoomCode, setMe, setState, code }) => {
    const { t } = useTranslation();

    const [exists, setExists] = useState<boolean>(true);
    const [name, setName] = useState<string>("");
    const [loadingRoom, setLoadingRoom] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        SocketClient.on(SocketServerEvents.RoomChecked, exists => setExists(exists));
        SocketClient.on(SocketServerEvents.RoomJoined, (data: RoomType & { success: boolean }) => {
            if (data.success) {
                setPlayers(data.players);
                setRoomName(data.name);
                setRoomCode(data.code);
                setMe(name);
                setState(RoomStateEnum.LOBBY);
            } else {
                setShowError(true);
                setLoadingRoom(false);
            }
        })
        return () => {
            SocketClient.off(SocketServerEvents.RoomChecked);
            SocketClient.off(SocketServerEvents.RoomJoined);
        };
    });

    useEffect(() => {
        SocketClient.emit(SocketClientEvents.CheckRoom, code);
    }, [code]);

    const join = () => {
        setLoadingRoom(true);
        SocketClient.emit(SocketClientEvents.JoinRoom, { code, name })
    }

    return (<Container className="text-center mt-5 pt-3 mb-3">
        <div className={exists ? "" : "d-none"}>
            <h2>{t("Game.Join.Header")}</h2>
            <p>{t("Game.Join.Subheader")}</p>
            <Input className="text-center" value={name} onChange={e => setName(e.target.value)} />
            <Button outline color="primary" className="mt-1 w-100" disabled={!name || loadingRoom} onClick={join}>
                <span className="mr-2">{loadingRoom ? <Spinner color="primary" size="sm" style={{ marginBottom: 2 }} /> : "✔️"}</span>
                {t("Game.Join.Button")}
            </Button>
            <Alert color="secondary" className="mt-2" isOpen={showError} toggle={() => setShowError(false)}>
                {t("Game.Join.Error")}
            </Alert>
        </div>
        <div className={exists ? "d-none" : ""}>
            <h2>{t("Game.Join.Not Exist")}</h2>
            <p>{t("Game.Join.Not Exist Text")}</p>
            <Button outline color="primary" href={`${process.env.PUBLIC_URL}/`}>
                <span className="mr-2">🆕</span>
                {t("Game.Join.Not Exist Button")}
            </Button>
        </div>
    </Container>);
}

export default Join;