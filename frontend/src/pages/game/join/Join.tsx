import RoomStateEnum from "../../../core/types/RoomStateEnum";
import { FC, useEffect, useState } from "react";
import { Button, Container, Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import { SocketReceiver, SocketSender } from "../../../libraries/SocketClient";

const Join: FC<{ changeState: (state: RoomStateEnum) => void, code: string }> = ({ changeState, code }) => {
    const { t } = useTranslation();

    const [exists, setExists] = useState<boolean>(true);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        SocketReceiver.onRoomChecked(exists => setExists(exists))
        SocketSender.checkRoom(code);
    }, [code]);

    const join = () => {
        console.log("ToDo: Implement")
    }

    return (<Container className="text-center mt-5 pt-3 mb-3">
        <div className={exists ? "" : "d-none"}>
            <h2>{t("Game.Join.Header")}</h2>
            <p>{t("Game.Join.Subheader")}</p>
            <Input className="text-center" value={name} onChange={e => setName(e.target.value)} />
            <Button outline color="primary" className="mt-1 w-100" disabled={!name}>
                <span className="mr-2">✔️</span>{t("Game.Join.Button")}
            </Button>
        </div>
        <div className={exists ? "d-none" : ""}>
            <h2>{t("Game.Join.Not Exist")}</h2>
            <p>{t("Game.Join.Not Exist Text")}</p>
            <Button outline color="primary" href={`${process.env.PUBLIC_URL}/`} onClick={join}>
                <span className="mr-2">🆕</span>{t("Game.Join.Not Exist Button")}
            </Button>
        </div>
    </Container>);
}

export default Join;