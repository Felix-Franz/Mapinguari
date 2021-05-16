import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import ItemEnum from "../../../../core/types/ItemEnum";
import GameCard from "../gamecard/GameCard";
import "./GamePlayer.scss";

const CLOSE_EVENT = "game-player-close";

const GamePlayer: FC<{
    playerName: string,
    cards: ItemEnum[],
    onCardClick?: (playerName: string, cardIndex: number) => void
}> = ({ playerName, cards, onCardClick }) => {

    const [expanded, setRawExpanded] = useState<boolean>(false);

    const setExpand = (expand: boolean) => {
        if (expanded === expand) return;
        if (expand)
            window.dispatchEvent(new Event(CLOSE_EVENT));
        setRawExpanded(expand);
    }

    window.addEventListener(CLOSE_EVENT, () => setExpand(false));

    return <div className={`game-player ${expanded ? "" : "pointer"}`} onClick={() => setExpand(true)}>
        <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} className="pointer m-1 float-right" onClick={() => setExpand(!expanded)}/>
        <h2>{playerName}</h2>
        {cards.map((c, i) =>
            <GameCard flipped={c !== ItemEnum.EMPTY} onClick={onCardClick && expanded ? () => onCardClick(playerName, i) : undefined} itemMind={c} size={expanded ? "md" : "sm"} />
        )}
    </div>
}

export default GamePlayer;