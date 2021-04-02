import { FC, useState } from "react";
import { RouteComponentProps } from "react-router";
import RoomStateEnum from "../../core/types/RoomStateEnum";
import Join from "./join/Join";

const Game : FC<RouteComponentProps<{code: string}>> = (props) => {

    const [state, setState] = useState<RoomStateEnum>();

    const getState = () => {
        const code = props.match.params.code;

        switch (state) {
            default:
                return <Join changeState={setState} code={code}/>;
        }
    }
    
    
    return getState();
}

export default Game;