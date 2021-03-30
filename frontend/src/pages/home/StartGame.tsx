import {useTranslation} from "react-i18next";
import {Button, Spinner} from "reactstrap";
import {useState} from "react";
import SocketClient from "../../libraries/SocketClient";
import {SocketClientEvents} from "../../core/types/SocketEventsEnum";

const StartGame  = () => {
    const {t} = useTranslation();
    const [state, setState] = useState< "initial" | "select-table" | "loading" >("initial");

    const createTable = () => {
        setState("loading");
        SocketClient.Socket.emit(SocketClientEvents.CreateRoom);  //ToDo Move to SocketClient
    }

    return (
        <div className="w-75 mx-auto mt-4" style={{
            border: "1px solid var(--primary)",
            borderRadius: "1em",
            padding: "1em",
        }}>
            <h3>{t("StartGame.Ready")}</h3>
            <div className={state === "initial" ? "" : "d-none"}>
                <Button color="primary" outline size="lg" className="mt-1 w-75" onClick={createTable}>
                    <span className="mr-2">🆕</span>{t("StartGame.Create Table")}
                </Button>
                <br/>
                <Button color="primary" outline size="lg" className="mt-1 w-75">
                    <span className="mr-2">🎲</span>{t("StartGame.Join Table")}
                </Button>
            </div>
            <div className={state === "loading" ? "" : "d-none"}>
                <Spinner color="primary" className="align-middle"/>
                <span className="ml-2 align-middle">{t("StartGame.Loading")}</span>
            </div>
        </div>
    );
}

export default StartGame;
