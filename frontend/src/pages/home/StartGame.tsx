import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Spinner } from "reactstrap";
import { SocketClientEvents, SocketServerEvents } from "../../core/types/SocketEventsEnum";
import Checker from "../../libraries/Checker";
import SocketClient from "../../libraries/SocketClient";

const StartGame = () => {
    const { t } = useTranslation();
    const [state, setState] = useState<"initial" | "create-room" | "join-room" | "loading">("initial");
    const [createRoomName, setCreateRoomName] = useState<string>("");
    const [joinRoomCode, setJoinRoomCode] = useState<string>("");

    useEffect(() => {
        SocketClient.on(SocketServerEvents.RoomCreated, roomCode =>
            window.location.assign(`${process.env.PUBLIC_URL}/game/${roomCode}`))
        return () => {
            SocketClient.off(SocketServerEvents.RoomCreated);
        }
    })

    const createRoom = () => {
        setState("loading");
        SocketClient.emit(SocketClientEvents.CreateRoom, createRoomName);
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
            <div className={state === "initial" ? "p-1" : "d-none"}>
                <Button color="primary" outline size="lg" className="mt-1 w-100" onClick={() => setState("create-room")}>
                    <span className="mr-2">🆕</span>{t("Home.StartGame.Create")}
                </Button>
                <br />
                <Button color="primary" outline size="lg" className="mt-1 w-100" onClick={() => setState("join-room")}>
                    <span className="mr-2">🎲</span>{t("Home.StartGame.Join")}
                </Button>
            </div>
            <div className={state === "create-room" ? "p-1" : "d-none"}>
                <Input type="text" className="py-2 mx-auto w-100 text-center" style={{ height: 48, marginTop: 4 }} placeholder={t("Home.StartGame.Name Room")} value={createRoomName} onChange={e => setCreateRoomName(e.target.value)} onKeyDown={e => Checker.isEnter(e, createRoom)}/>
                <Button color="primary" outline size="lg" className="mt-1 w-100" onClick={createRoom} disabled={!createRoomName}>
                    <span className="mr-2">🚪</span>{t("Home.StartGame.Create")}
                </Button>
            </div>
            <div className={state === "join-room" ? "p-1" : "d-none"}>
                <Input type="number" className="py-2 mx-auto w-100 text-center" style={{ height: 48, marginTop: 4 }} placeholder={t("Home.StartGame.Enter Code")} value={joinRoomCode} onChange={e => setJoinRoomCode(e.target.value)}  onKeyDown={e => Checker.isEnter(e, joinRoom)}/>
                <Button color="primary" outline size="lg" className="mt-1 w-100" onClick={joinRoom} disabled={!joinRoomCode}>
                    <span className="mr-2">🚪</span>{t("Home.StartGame.Join")}
                </Button>
            </div>
            <div className={state === "loading" ? "mt-5 p-1" : "d-none"} >
                <Spinner color="primary" className="align-middle" />
                <span className="ml-2 align-middle">{t("Home.StartGame.Loading")}</span>
            </div>
        </div>
    );
}

export default StartGame;
