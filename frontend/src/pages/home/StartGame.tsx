import { useTranslation } from "react-i18next";
import { Button, Input, Spinner } from "reactstrap";
import { useState } from "react";
import SocketClient from "../../libraries/SocketClient";
import { SocketClientEvents } from "../../core/types/SocketEventsEnum";

const StartGame = () => {
    const { t } = useTranslation();
    const [state, setState] = useState<"initial" | "select-room" | "loading">("initial");
    const [joinRoomCode, setJoinRoomCode] = useState<string>("");

    const createTable = () => {
        setState("loading");
        SocketClient.Socket.emit(SocketClientEvents.CreateRoom);  //ToDo Move to SocketClient
        window.history.pushState(undefined, '', "?room=0815");  //ToDo make default redirect (/room/:roomId) for answer from socket server, add name & character on the next page
    }

    const joinTable = () => {
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
                <Button color="primary" outline size="lg" className="mt-1 w-75" onClick={createTable}>
                    <span className="mr-2">🆕</span>{t("Home.StartGame.Create Table")}
                </Button>
                <br />
                <Button color="primary" outline size="lg" className="mt-1 w-75" onClick={() => setState("select-room")}>
                    <span className="mr-2">🎲</span>{t("Home.StartGame.Join Table")}
                </Button>
            </div>
            <div className={state === "select-room" ? "" : "d-none"}>
                <Input type="number" className="py-2 mx-auto w-75 text-center" style={{ height: 48, marginTop: 12 }}  placeholder="0815" value={joinRoomCode} onChange={e => setJoinRoomCode(e.target.value)}/>
                <Button color="primary" outline size="lg" className="mt-1 w-75" onClick={joinTable}>
                    <span className="mr-2">🚪</span>{t("Home.StartGame.Join Table")}
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
