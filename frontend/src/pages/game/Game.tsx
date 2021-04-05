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

const Game: FC<RouteComponentProps<{ code: string }>> = (props) => {
    const { t } = useTranslation();

    const [state, setState] = useState<RoomStateEnum>();
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

        return () => {
            SocketClient.off(SocketServerEvents.PlayerJoined);
            SocketClient.off(SocketServerEvents.PlayerReconnected);
            SocketClient.off(SocketServerEvents.PlayerDisconnected);
        }
    });

    const getState = () => {
        const code = props.match.params.code;

        switch (state) {
            case RoomStateEnum.LOBBY:
                return <Lobby players={players} roomName={roomName} roomCode={roomCode} setState={setState} />
            default:
                return <Join setPlayers={setPlayers} setRoomName={setRoomName} setRoomCode={setRoomCode} setState={setState} code={code} />;
        }
    }

    const statePage = getState();
    console.log(state)

    if (state === undefined)
        return statePage;
    else return <Tabs>{statePage}</Tabs>
}

export default Game;