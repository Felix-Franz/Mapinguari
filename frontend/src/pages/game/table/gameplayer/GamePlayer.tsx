import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import ItemEnum from "../../../../core/types/ItemEnum";
import GameCard from "../gamecard/GameCard";
import "./GamePlayer.scss";

const CLOSE_EVENT = "game-player-close";

const GamePlayer: FC<{
    className?: string,
    playerName: string,
    playerSTurn?: boolean,
    cards: ItemEnum[],
    onCardClick?: (playerName: string, cardIndex: number) => void
}> = ({ className, playerName, playerSTurn, cards, onCardClick }) => {
    const {t} = useTranslation();
    const [expanded, setRawExpanded] = useState<boolean>(false);

    const setExpand = (expand: boolean) => {
        if (expanded === expand) return;
        if (expand)
            window.dispatchEvent(new Event(CLOSE_EVENT));
        setRawExpanded(expand);
    }

    window.addEventListener(CLOSE_EVENT, () => setExpand(false));

    return <div className={`${className || ""} game-player ${expanded ? "" : "pointer"} ${playerSTurn ? "game-player-turn" : ""}`} onClick={() => setExpand(true)}>
        <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} className="pointer m-1 float-right" onClick={() => setExpand(!expanded)}/>
        <h2>{playerName}</h2>
        <p className={`mb-2 game-player-turn ${playerSTurn ? "" : "d-none"}`}>{t("Game.Table.GamePlayer.Player'sTurn")}</p>
        {cards.map((c, i) =>
            <GameCard flipped={c !== ItemEnum.EMPTY} onClick={onCardClick && expanded ? () => onCardClick(playerName, i) : undefined} itemMind={c} size={expanded ? "md" : "sm"} />
        )}
    </div>
}

export default GamePlayer;