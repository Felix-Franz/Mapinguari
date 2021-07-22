import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import AlertModal from "../../components/AlertModal";
import Avatar from "../../components/avatar/Avatar";
import AvatarConfigurationType from "../../core/types/AvatarConfigurationType";
import CardType from "../../core/types/CardType";
import GameMessageEnum from "../../core/types/GameMessageEnum";
import MeetingType from "../../core/types/MeetingType";
import PlayerMindEnum from "../../core/types/PlayerMindEnum";
import PlayerRoleEnum from "../../core/types/PlayerRoleEnum";
import PlayerType from "../../core/types/PlayerType";
import RoomStateEnum from "../../core/types/RoomStateEnum";
import { SocketServerEvents } from "../../core/types/SocketEventsEnum";
import SocketClient from "../../libraries/SocketClient";
import Join from "./join/Join";
import Lobby from "./lobby/Lobby";
import Table from "./table/Table";
import Tabs from "./tabs/Tabs";

const Game: FC<RouteComponentProps<{ code: string }>> = (props) => {
    const { t } = useTranslation();

    const [state, setState] = useState<RoomStateEnum>();
    const [me, setMe] = useState<string>();
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const [cards, setCards] = useState<CardType[]>([]);
    const [roomName, setRoomName] = useState<string>("");
    const [roomCode, setRoomCode] = useState<string>("");
    const [meeting, setMeeting] = useState<MeetingType | undefined>();

    useEffect(() => {
        SocketClient.on(SocketServerEvents.PlayerJoined, (player: PlayerType) => {
            const ps = Object.assign([], players);
            ps.push(player);
            setPlayers(ps);
            toast.info(<>
                <Avatar configuration={player.avatar} style={{ maxWidth: "4em" }} className="float-left mr-2" />
                <div style={{ display: "flex", alignItems: "center" }}>{t('Game.Toast.Join', { name: player.name })}</div>
            </>, { bodyStyle: { display: "flex" } });
        });

        const updatePlayers = (player: PlayerType) => {
            let ps = Object.assign([] as PlayerType[], players);
            ps = ps.map(p => {
                if (p.name === player.name)
                    return player;
                else
                    return p;
            });
            setPlayers(ps);
        }

        SocketClient.on(SocketServerEvents.PlayerReconnected, (player: PlayerType) => {
            updatePlayers(player);
            toast.info(<>
                <Avatar configuration={player.avatar} style={{ maxWidth: "4em" }} className="float-left mr-2" />
                <div style={{ display: "flex", alignItems: "center" }}>{t('Game.Toast.Reconnect', { name: player.name })}</div>
            </>, { bodyStyle: { display: "flex" } })
        });

        SocketClient.on(SocketServerEvents.PlayerDisconnected, (player: PlayerType) => {
            updatePlayers(player);
            toast.error(<>
                <Avatar configuration={player.avatar} style={{ maxWidth: "4em" }} className="float-left mr-2" />
                <div style={{ display: "flex", alignItems: "center" }}>{t('Game.Toast.Disconnect', { name: player.name })}</div>
            </>, { bodyStyle: { display: "flex" } });
        });

        SocketClient.on(SocketServerEvents.PlayerRoleChanged, (player: PlayerType) => {
            updatePlayers(player);
            toast.info(<>
                <Avatar configuration={player.avatar} style={{ maxWidth: "4em" }} className="float-left mr-2" />
                <div style={{ display: "flex", alignItems: "center" }}>{t(player.role === PlayerRoleEnum.ADMIN ? 'Game.Toast.RoleChanged.Admin' : 'Game.Toast.RoleChanged.AdminUser', { name: player.name })}</div>
            </>, { bodyStyle: { display: "flex" } });
        });

        SocketClient.on(SocketServerEvents.PlayerLeft, (player: { name: string, avatar: AvatarConfigurationType }) => {
            setPlayers(players.filter(p => p.name !== player.name));
            toast.error(<>
                <Avatar configuration={player.avatar} style={{ maxWidth: "4em" }} className="float-left mr-2" />
                <div style={{ display: "flex", alignItems: "center" }}>{t('Game.Toast.PlayerLeft', { name: player.name })}</div>
            </>, { bodyStyle: { display: "flex" } });
        });

        SocketClient.on(SocketServerEvents.RoomLeft, (data: { success: boolean, name: string }) => {
            if (data.success) {
                toast.info(t('Game.Toast.Left'), {
                    onClose: () => window.location.assign(`${process.env.PUBLIC_URL}/`)
                });
            }
            else
                toast.error(t('Game.Toast.LeftError', { name: data.name }));
        });

        SocketClient.on(SocketServerEvents.ChangeGame, (data: { messages?: GameMessageEnum[], state?: RoomStateEnum, players?: PlayerType[], cards?: CardType[] }) => {
            if (data.players)
                setPlayers(data.players);
            if (data.cards)
                setCards(data.cards);
            if (data.state)
                setState(data.state);
            console.log(data.messages)
            if (data.messages)
                data.messages.forEach(message => {
                    switch (message) {
                        case GameMessageEnum.START:
                            const good = data.players!.find(p => p.name === me)?.mind === PlayerMindEnum.GOOD;
                            AlertModal.show({
                                header: t("Game.Message.GameStarted.Header"),
                                message: good ? t("Game.Message.GameStarted.MessageGood") : t("Game.Message.GameStarted.MessageBad"),
                                buttons: [{
                                    text: t("General.Okay"),
                                    color: good ? "primary" : "secondary"
                                }]
                            })
                            break;
                        case GameMessageEnum.SELECTEDGOOD: {
                            const translations = t("Game.Toast.SelectedGood", { returnObjects: true });
                            toast.info(translations[Math.floor(translations.length * Math.random())]);
                            break;
                        }
                        case GameMessageEnum.SELECTEDBAD:
                            toast.error(t("Game.Toast.SelectedBad"));
                            break;
                        case GameMessageEnum.SELECTEDNEUTRAL: {
                            const translations = t("Game.Toast.SelectedNeutral", { returnObjects: true });
                            toast.warn(translations[Math.floor(translations.length * Math.random())]);
                            break;
                        }
                        case GameMessageEnum.SELECTCARDFAILED:
                            toast.error(t("Game.Toast.SelectCardFailed"));
                            break;
                        case GameMessageEnum.DAY1OVER:
                            toast.success(t("Game.Toast.Day1Over"));
                            break;
                        case GameMessageEnum.DAY2OVER:
                            toast.success(t("Game.Toast.Day2Over"));
                            break;
                        case GameMessageEnum.DAY3OVER:
                            toast.success(t("Game.Toast.Day3Over"));
                            break;
                    }
                });
            if (data.state) {
                if (data.state === RoomStateEnum.GOODWON)
                    toast.info(t("Game.GoodWon.Short"));
                if (data.state === RoomStateEnum.BADWON)
                    toast.error(t("Game.BadWon.Short"));
            }
        })

        SocketClient.on(SocketServerEvents.MeetingChanged, (meeting: MeetingType) => {
            setMeeting(meeting);
            if (meeting)
                toast.success(t("Game.Toast.MeetingEnabled"));
            else
                toast.error(t("Game.Toast.MeetingDisabled"));
        });

        return () => {
            SocketClient.off(SocketServerEvents.PlayerJoined);
            SocketClient.off(SocketServerEvents.PlayerReconnected);
            SocketClient.off(SocketServerEvents.PlayerDisconnected);
            SocketClient.off(SocketServerEvents.PlayerRoleChanged);
            SocketClient.off(SocketServerEvents.PlayerLeft);
            SocketClient.off(SocketServerEvents.RoomLeft);
            SocketClient.off(SocketServerEvents.ChangeGame);
            SocketClient.off(SocketServerEvents.MeetingChanged);
        }
    });

    const statePage = (() => {

        switch (state) {
            case RoomStateEnum.LOBBY:
                return <Lobby roomName={roomName} roomCode={roomCode} me={me!} players={players} meeting={meeting} />
            case RoomStateEnum.PROGRESS:
            case RoomStateEnum.GOODWON:
            case RoomStateEnum.BADWON:
                return <Table me={me!} roomName={roomName} players={players} cards={cards} state={state} />
            default:
                const code = props.match.params.code;
                return <Join setPlayers={setPlayers} setRoomName={setRoomName} setRoomCode={setRoomCode} setMe={setMe} setState={setState} setCards={setCards} setMeeting={setMeeting} code={code} />;
        }
    })();


    const userIsAdmin = players.find(p => p.name === me)?.role === PlayerRoleEnum.ADMIN;

    if (state === undefined)
        return statePage;
    else return <Tabs players={players} me={me!} roomCode={roomCode} allowStop={userIsAdmin && state !== RoomStateEnum.LOBBY}
        allowKick={userIsAdmin && state === RoomStateEnum.LOBBY} meeting={meeting}>
        {statePage}
    </Tabs >
}

export default Game;