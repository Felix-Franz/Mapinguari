import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import RoomStateEnum from "../../core/types/RoomStateEnum";
import { SocketServerEvents } from "../../core/types/SocketEventsEnum";
import SocketClient from "../../libraries/SocketClient";
import Join from "./join/Join";
import {toast} from "react-toastify";
import { useTranslation } from "react-i18next";
import PlayerType from "../../core/types/PlayerType";

const Game : FC<RouteComponentProps<{code: string}>> = (props) => {
    const { t } = useTranslation();

    useEffect(() => {
        SocketClient.on(SocketServerEvents.PlayerJoined, (player: PlayerType) => {
            toast.info(t('Game.Toast.Join', {name: player.name}));
        });
        
        SocketClient.on(SocketServerEvents.PlayerReconnected, (player: PlayerType) => {
            toast.info(t('Game.Toast.Reconnect', {name: player.name}));
        });
        
        SocketClient.on(SocketServerEvents.PlayerDisconnected, (player: PlayerType) => {
            toast.error(t('Game.Toast.Disconnect', {name: player.name}));
        });

        return () => {
            SocketClient.off(SocketServerEvents.PlayerJoined);
            SocketClient.off(SocketServerEvents.PlayerReconnected);
            SocketClient.off(SocketServerEvents.PlayerDisconnected);
        }
    });

    const [state, setState] = useState<RoomStateEnum>();

    const getState = () => {
        const code = props.match.params.code;

        switch (state) {
            case RoomStateEnum.LOBBY:
                return <div>LOBBY!</div>
            default:
                return <Join changeState={setState} code={code}/>;
        }
    }
    
    
    return getState();
}

export default Game;