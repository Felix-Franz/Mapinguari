import { useState } from "react";
import ItemEnum from "../../../core/types/ItemEnum";
import GameCard from "./gamecard/GameCard";

const GamePlayer = () => {
    const [flipped, setFlipped] = useState<boolean>(false);
    return <div>
        <GameCard flipped={flipped} onClick={() => setFlipped(!flipped)} itemMind={ItemEnum.BAD} size="md" />
        <GameCard flipped={flipped} onClick={() => setFlipped(!flipped)} itemMind={ItemEnum.BAD} size="md" />
        <GameCard flipped={flipped} onClick={() => setFlipped(!flipped)} itemMind={ItemEnum.BAD} size="md" />
        <GameCard flipped={flipped} onClick={() => setFlipped(!flipped)} itemMind={ItemEnum.BAD} size="md" />
        <GameCard flipped={flipped} onClick={() => setFlipped(!flipped)} itemMind={ItemEnum.BAD} size="md" />
        <br />
        <GameCard flipped={flipped} onClick={() => setFlipped(!flipped)} itemMind={ItemEnum.BAD} size="sm" />
        <GameCard flipped={flipped} onClick={() => setFlipped(!flipped)} itemMind={ItemEnum.BAD} size="sm" />
        <GameCard flipped={flipped} onClick={() => setFlipped(!flipped)} itemMind={ItemEnum.BAD} size="sm" />
        <GameCard flipped={flipped} onClick={() => setFlipped(!flipped)} itemMind={ItemEnum.BAD} size="sm" />
        <GameCard flipped={flipped} onClick={() => setFlipped(!flipped)} itemMind={ItemEnum.BAD} size="sm" />
    </div>
}

export default GamePlayer;