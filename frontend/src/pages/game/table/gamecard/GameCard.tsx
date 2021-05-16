import { FC } from "react";
import ReactCardFlip from 'react-card-flip';
import CardEnum from "../../../../core/types/CardEnum";
import bad from "../../../../resources/bad.svg";
import empty from "../../../../resources/empty.svg";
import good from "../../../../resources/good.svg";
import logo from "../../../../resources/logo.svg";
import neutral from "../../../../resources/neutral.svg";
import "./GameCard.scss";

const GameCard: FC<{
    className?: string,
    size: "md" | "sm"
    itemMind?: CardEnum,
    flipped: boolean,
    onClick?: (flipped: boolean) => void
}> = ({ className, size, itemMind, flipped, onClick }) => {

    let image, color;
    switch (itemMind) {
        case CardEnum.GOOD:
            image = good;
            color = "primary";
            break;
        case CardEnum.BAD:
            image = bad;
            color = "secondary";
            break;
        case CardEnum.NEUTRAL:
            image = neutral;
            color = "tertiary";
            break;
        case CardEnum.EMPTY:
        default:
            image = empty;
            color = "tertiary";
            break;
    }

    let sizeClass = "";
    if (size)
        sizeClass = `card-${size}`

    return (<div className={`text-center ${className || ""}`} style={{ display: "inline-block" }}>
        <ReactCardFlip isFlipped={flipped}>
            <div className={`card ${sizeClass}`} style={{ cursor: onClick ? "pointer" : undefined }} onClick={onClick ? () => onClick(flipped) : undefined}>
                <img src={logo} alt="logo" className="mx-auto" style={{ width: "90%", marginTop: "5%" }} />
                <p className={sizeClass}  style={{ marginTop: "10%" }}>Mapinguari</p>
            </div>
            <div className={`card ${sizeClass}`} style={{ cursor: onClick ? "pointer" : undefined, borderColor: `var(--${color})` }} onClick={onClick ? () => onClick(flipped) : undefined}>
                <img src={image} alt="logo" className="mx-auto" style={{ width: "90%", marginTop: "5%" }} />
                <p className={sizeClass} style={{ marginTop: "10%" }}>Mapinguari</p>
            </div>
        </ReactCardFlip>
    </div>);
}

export default GameCard;
