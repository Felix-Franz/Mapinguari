import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, ButtonGroup, Collapse, Container, FormGroup, Input, Spinner } from "reactstrap";
import Avatar, { AvatarConfigurationEditor, AvatarConfigurationOptions } from "../../../components/avatar/Avatar";
import AvatarConfigurationType from "../../../core/types/AvatarConfigurationType";
import CardType from "../../../core/types/CardType";
import MeetingType from "../../../core/types/MeetingType";
import PlayerType from "../../../core/types/PlayerType";
import RoomStateEnum from "../../../core/types/RoomStateEnum";
import RoomType from "../../../core/types/RoomType";
import { SocketClientEvents, SocketServerEvents } from "../../../core/types/SocketEventsEnum";
import Checker from "../../../libraries/Checker";
import SocketClient from "../../../libraries/SocketClient";
import PlayerStorage from "../../../storage/PlayerStorage";

const Join: FC<{
    setPlayers: (players: PlayerType[]) => void,
    setRoomName: (name: string) => void,
    setRoomCode: (code: string) => void,
    setMe: (name: string) => void,
    setState: (state: RoomStateEnum) => void,
    setCards: (cards: CardType[]) => void,
    setMeeting: (meeting?: MeetingType) => void,
    code: string
}> = ({ setPlayers, setRoomName, setRoomCode, setMe, setState, setCards, setMeeting, code }) => {
    const { t } = useTranslation();

    const [exists, setExists] = useState<boolean>(true);
    const [name, setName] = useState<string>("");
    const [avatar, setAvatar] = useState<AvatarConfigurationType>({});
    const [showAvatarEditor, setShowAvatarEditor] = useState<boolean>(false);
    const [loadingRoom, setLoadingRoom] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);


    const join = () => {
        setLoadingRoom(true);
        SocketClient.emit(SocketClientEvents.JoinRoom, { code, name, avatar })
    }

    const generateRandomAvatar = () => {
        const avatarConfig = Object.fromEntries(Object.keys(AvatarConfigurationOptions).map(key => {
            // @ts-ignore
            const options: string[] = AvatarConfigurationOptions[key];
            const randomIndex = Math.floor(options.length * Math.random())
            return [key, options[randomIndex]]
        }));
        setAvatar(avatarConfig);
    };


    useEffect(() => {
        SocketClient.on(SocketServerEvents.RoomChecked, exists => setExists(exists));
        SocketClient.on(SocketServerEvents.RoomJoined, (data: RoomType & { success: boolean }) => {
            if (data.success) {
                setPlayers(data.players);
                setRoomName(data.name);
                setRoomCode(data.code);
                setMe(name);
                setCards(data.cards);
                setMeeting(data.meeting);
                setState(data.state);
                PlayerStorage.setPlayer({name, avatar});
            } else {
                setShowError(true);
                setLoadingRoom(false);
            }
        });

        return () => {
            SocketClient.off(SocketServerEvents.RoomChecked);
            SocketClient.off(SocketServerEvents.RoomJoined);
        }
    });

    useEffect(() => {
        const player = PlayerStorage.getPlayer();
        if (player) {
            setName(player.name);
            setAvatar(player.avatar);
        } else
            generateRandomAvatar();
    }, []);

    useEffect(() => {
        SocketClient.emit(SocketClientEvents.CheckRoom, code);
    }, [code]);

    return (<Container className="text-center mt-3 mb-5 pt-3 mb-3">
        <div className={exists ? "" : "d-none"}>
            <h2>{t("Game.Join.Header")}</h2>
            <p>{t("Game.Join.Subheader")}</p>

            <div>
                <Avatar style={{ maxWidth: "15em" }} className="mx-auto mb-1" configuration={avatar} />
                <Collapse isOpen={showAvatarEditor} className="mt-2 px-3 pb-2" style={{
                    border: "1px solid var(--primary)",
                    borderTopLeftRadius: "0.5em",
                    borderTopRightRadius: "0.5em"
                }}>
                    <AvatarConfigurationEditor configuration={avatar} onChange={setAvatar} />
                </Collapse>
                <ButtonGroup className="w-100">
                    <Button outline color="primary" onClick={generateRandomAvatar}>
                        🔀 {t("Game.Join.AvatarRandom")}
                    </Button>
                    <Button outline color="primary" onClick={() => setShowAvatarEditor(!showAvatarEditor)}>
                        {showAvatarEditor ? `💾 ${t("Game.Join.AvatarSave")}` : `🖊️ ${t("Game.Join.AvatarEdit")}`}
                    </Button>
                </ButtonGroup>
            </div>

            <FormGroup className="my-3">
                <Input className="text-center" value={name} placeholder={t("Game.Join.Name")} onChange={e => setName(e.target.value)} onKeyDown={e => Checker.isEnter(e, join)} />
            </FormGroup>
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