import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Spinner } from "reactstrap";
import { SocketReceiver, SocketSender } from "../../libraries/SocketClient";

const StartGame = () => {
    const { t } = useTranslation();
    const [state, setState] = useState<"initial" | "create-room" | "join-room" | "loading">("initial");
    const [createRoomName, setCreateRoomName] = useState<string>("");
    const [joinRoomCode, setJoinRoomCode] = useState<string>("");

    const createRoom = () => {
        setState("loading");
        SocketReceiver.onRoomCreated(roomCode =>
            window.location.assign(`${process.env.PUBLIC_URL}/game/${roomCode}`)
        )
        SocketSender.createRoom(createRoomName);
    }

    const joinRoom = () => {
        setState("loading");
        window.location.assign(`${process.env.PUBLIC_URL}/game/${joinRoomCode}`)
    }

    return (
        <div className="w-75 mx-auto mt-4" style={{
            border: "1px solid var(--primary)",
            borderRadius: "1em",
            padding: "1em",
            minHeight: "12em"
        }}>
            <h3>{t("Home.StartGame.Ready")}</h3>
            <div className={state === "initial" ? "" : "d-none"}>
                <Button color="primary" outline size="lg" className="mt-1 w-75" onClick={() => setState("create-room")}>
                    <span className="mr-2">🆕</span>{t("Home.StartGame.Create")}
                </Button>
                <br />
                <Button color="primary" outline size="lg" className="mt-1 w-75" onClick={() => setState("join-room")}>
                    <span className="mr-2">🎲</span>{t("Home.StartGame.Join")}
                </Button>
            </div>
            <div className={state === "create-room" ? "" : "d-none"}>
                <Input type="text" className="py-2 mx-auto w-75 text-center" style={{ height: 48, marginTop: 12 }} placeholder={t("Home.StartGame.Name Room")} value={createRoomName} onChange={e => setCreateRoomName(e.target.value)} />
                <Button color="primary" outline size="lg" className="mt-1 w-75" onClick={createRoom}>
                    <span className="mr-2">🚪</span>{t("Home.StartGame.Create")}
                </Button>
            </div>
            <div className={state === "join-room" ? "" : "d-none"}>
                <Input type="number" className="py-2 mx-auto w-75 text-center" style={{ height: 48, marginTop: 12 }} placeholder={t("Home.StartGame.Enter Code")} value={joinRoomCode} onChange={e => setJoinRoomCode(e.target.value)} />
                <Button color="primary" outline size="lg" className="mt-1 w-75" onClick={joinRoom} disabled={!joinRoomCode}>
                    <span className="mr-2">🚪</span>{t("Home.StartGame.Join")}
                </Button>
            </div>
            <div className={state === "loading" ? "mt-5" : "d-none"} >
                <Spinner color="primary" className="align-middle" />
                <span className="ml-2 align-middle">{t("Home.StartGame.Loading")}</span>
            </div>
        </div>
    );
}

export default StartGame;
