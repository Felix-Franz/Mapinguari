import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import Avatar from "../../../../components/avatar/Avatar";
import CardEnum from "../../../../core/types/CardEnum";
import PlayerType from "../../../../core/types/PlayerType";
import GameCard from "../gamecard/GameCard";
import "./GamePlayer.scss";

const CLOSE_EVENT = "game-player-close";

const GamePlayer: FC<{
    className?: string,
    player: PlayerType,
    playerSTurn?: boolean,
    cards: CardEnum[],
    onCardClick?: (player: PlayerType, cardIndex: number) => void
}> = ({ className, player, playerSTurn, cards, onCardClick }) => {
    const { t } = useTranslation();
    const [expanded, setRawExpanded] = useState<boolean>(false);

    const setExpand = (expand: boolean) => {
        if (expanded === expand) return;
        if (expand)
            window.dispatchEvent(new Event(CLOSE_EVENT));
        setRawExpanded(expand);
    }

    window.addEventListener(CLOSE_EVENT, () => setExpand(false));

    return <div className={`${className || ""} game-player ${expanded ? "" : "pointer"} ${playerSTurn ? "game-player-turn" : ""}`} onClick={() => setExpand(true)}>
        <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} className="pointer m-1 float-right" onClick={() => setExpand(!expanded)} />
        <div className="mb-2">
            <Avatar configuration={player.avatar} style={{ maxWidth: "4em" }} className="d-inline-block" />
            <h2 className="d-inline-block ml-1 align-middle">{player.name}</h2>
        </div>
        <p className={`mb-2 game-player-turn ${playerSTurn ? "" : "d-none"}`}>{t("Game.Table.GamePlayer.Player'sTurn")}</p>
        {cards.map((c, i) =>
            <GameCard flipped={c !== CardEnum.EMPTY} onClick={onCardClick && expanded ? () => onCardClick(player, i) : undefined} itemMind={c} size={expanded ? "md" : "sm"} />
        )}
    </div>
}

export default GamePlayer;