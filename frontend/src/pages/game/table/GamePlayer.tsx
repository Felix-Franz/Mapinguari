import { useState } from "react";
import ItemEnum from "../../../core/types/ItemEnum";
import GameCard from "./gamecard/GameCard";

const GamePlayer = () => {
    const [flipped, setFlipped] = useState<boolean>(false);
    return <GameCard flipped={flipped} onClick={() => setFlipped(!flipped)} itemMind={ItemEnum.BAD}/>
}

export default GamePlayer;