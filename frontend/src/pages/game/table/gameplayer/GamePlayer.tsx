import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "reactstrap";
import Avatar from "../../../../components/avatar/Avatar";
import PlayerMindEnum from "../../../../core/types/PlayerMindEnum";
import PlayerType from "../../../../core/types/PlayerType";
import GameCard from "../gamecard/GameCard";
import "./GamePlayer.scss";

const CLOSE_EVENT = "game-player-close";

const GamePlayer: FC<{
    className?: string,
    player: PlayerType,
    me: string,
    onCardClick?: (player: PlayerType, cardIndex: number) => void,
    cardsAlwaysVisible?: boolean
    }> = ({ className, me, player, onCardClick, cardsAlwaysVisible = false}) => {
    const { t } = useTranslation();
    const [expanded, setRawExpanded] = useState<boolean>(false);

    const setExpand = (expand: boolean) => {
        if (expanded === expand) return;
        if (expand)
            window.dispatchEvent(new Event(CLOSE_EVENT));
        setRawExpanded(expand);
    }

    window.addEventListener(CLOSE_EVENT, () => setExpand(false));

    let color;
    switch (player.mind) {
        case PlayerMindEnum.GOOD:
            color = "primary";
            break;
        case PlayerMindEnum.BAD:
            color = "secondary";
            break;
        default:
            color = "tertiary";
            break;
    }

    return <div className={`${className || ""} game-player no-user-select ${expanded ? "" : "pointer"} ${player.inTurn ? "game-player-turn-" : "border-"}${color}`} onClick={() => setExpand(true)}>       
     <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} className="pointer m-1 float-right" onClick={() => setExpand(!expanded)} />
        <div className="mb-2">
            <Avatar configuration={player.avatar} mind={player.mind} style={{ maxWidth: "4em" }} className="d-inline-block" />
            <div className="d-inline-block ml-1 align-middle">
                <h2 className={`mb-0 ${player.inTurn ? "game-player-turn-" : "text-"}${color}`}>{player.name}</h2>
                <Badge className={`ml-2 ${player.name === me ? "" : "d-none"}`} color={color}>{t("Game.Tabs.Player.Me")}</Badge>
            </div>
        </div>
        <p className={`mb-2 ${player.inTurn ? "game-player-turn-" : "text-"}${color} ${player.inTurn ? "" : "d-none"}`}>{t("Game.Table.GamePlayer.Player'sTurn")}</p>
        {player.cards!.map((c, i) =>
            <GameCard flipped={cardsAlwaysVisible || c.visible} onClick={onCardClick && expanded ? () => onCardClick(player, i) : undefined} itemMind={c.type} size={expanded ? "md" : "sm"} key={i} />
        )}
    </div>
}

export default GamePlayer;