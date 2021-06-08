import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import RoomStateEnum from "../../core/types/RoomStateEnum";
import { SocketServerEvents } from "../../core/types/SocketEventsEnum";
import SocketClient from "../../libraries/SocketClient";
import Join from "./join/Join";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import PlayerType from "../../core/types/PlayerType";
import Lobby from "./lobby/Lobby";
import Tabs from "./tabs/Tabs";
import PlayerRoleEnum from "../../core/types/PlayerRoleEnum";
import Table from "./table/Table";
import Avatar from "../../components/avatar/Avatar";
import AvatarConfigurationType from "../../core/types/AvatarConfigurationType";

const Game: FC<RouteComponentProps<{ code: string }>> = (props) => {
    const { t } = useTranslation();

    const [state, setState] = useState<RoomStateEnum>();
    const [me, setMe] = useState<string>();
    const [players, setPlayers] = useState<PlayerType[]>([]);
    const [roomName, setRoomName] = useState<string>("");
    const [roomCode, setRoomCode] = useState<string>("");

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

        SocketClient.on(SocketServerEvents.ChangeGame, (data: { state: RoomStateEnum, players: PlayerType[]}) => {
            setPlayers(data.players);
            setState(data.state);
        })

        return () => {
            SocketClient.off(SocketServerEvents.PlayerJoined);
            SocketClient.off(SocketServerEvents.PlayerReconnected);
            SocketClient.off(SocketServerEvents.PlayerDisconnected);
            SocketClient.off(SocketServerEvents.PlayerRoleChanged);
            SocketClient.off(SocketServerEvents.PlayerLeft);
            SocketClient.off(SocketServerEvents.RoomLeft);
            SocketClient.off(SocketServerEvents.ChangeGame);
        }
    });

    const getState = () => {

        switch (state) {
            case RoomStateEnum.LOBBY:
                return <Lobby roomName={roomName} roomCode={roomCode} me={me!} players={players} />
            case RoomStateEnum.TABLE:
                return <Table me={me!} roomName={roomName} players={players} />
            default:
                const code = props.match.params.code;
                return <Join setPlayers={setPlayers} setRoomName={setRoomName} setRoomCode={setRoomCode} setMe={setMe} setState={setState} code={code} />;
        }
    }


    const statePage = getState();
    const userIsAdmin = players.find(p => p.name === me)?.role === PlayerRoleEnum.ADMIN;

    if (state === undefined)
        return statePage;
    else return <Tabs players={players} me={me!} roomCode={roomCode} allowStop={userIsAdmin && state !== RoomStateEnum.LOBBY}
        allowKick={userIsAdmin && state === RoomStateEnum.LOBBY} >
        {statePage}
    </Tabs >
}

export default Game;