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
            toast.info(t('Game.Toast.Join', { name: player.name }));
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
            toast.info(t('Game.Toast.Reconnect', { name: player.name }));
        });

        SocketClient.on(SocketServerEvents.PlayerDisconnected, (player: PlayerType) => {
            updatePlayers(player);
            toast.error(t('Game.Toast.Disconnect', { name: player.name }));
        });

        SocketClient.on(SocketServerEvents.PlayerRoleChanged, (player: PlayerType) => {
            updatePlayers(player);
            if (player.role === PlayerRoleEnum.ADMIN)
                toast.error(t('Game.Toast.RoleChanged.Admin', { name: player.name }));
            else
                toast.error(t('Game.Toast.RoleChanged.User', { name: player.name }));
        });

        SocketClient.on(SocketServerEvents.PlayerLeft, (name: string) => {
            setPlayers(players.filter(p => p.name !== name));
            toast.error(t('Game.Toast.PlayerLeft', { name }));
        });

        SocketClient.on(SocketServerEvents.RoomLeft, (success: boolean) => {
            if (success) {
                toast.info(t('Game.Toast.Left'), {
                    onClose: () => window.location.assign(`${process.env.PUBLIC_URL}/`)
                });
            }
            else
                toast.error(t('Game.Toast.LeftError'));
        });

        SocketClient.on(SocketServerEvents.ChangeGame, (data: { state: RoomStateEnum }) => {
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
        const code = props.match.params.code;

        switch (state) {
            case RoomStateEnum.LOBBY:
                return <Lobby roomName={roomName} roomCode={roomCode} me={me!} setState={setState} />
            case RoomStateEnum.TABLE:
                return <Table />
            default:
                return <Join setPlayers={setPlayers} setRoomName={setRoomName} setRoomCode={setRoomCode} setMe={setMe} setState={setState} code={code} />;
        }
    }

    const statePage = getState();

    if (state === undefined)
        return statePage;
    else return <Tabs players={players} me={me!} roomCode={roomCode} allowKick={players.find(p => p.name === me)?.role === PlayerRoleEnum.ADMIN && state === RoomStateEnum.LOBBY}>{statePage}</Tabs>
}

export default Game;