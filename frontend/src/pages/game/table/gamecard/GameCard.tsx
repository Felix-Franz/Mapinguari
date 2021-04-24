import { FC } from "react";
import ReactCardFlip from 'react-card-flip';
import ItemEnum from "../../../../core/types/ItemEnum";
import bad from "../../../../resources/bad.svg";
import empty from "../../../../resources/empty.svg";
import good from "../../../../resources/good.svg";
import logo from "../../../../resources/logo.svg";
import neutral from "../../../../resources/neutral.svg";
import "./GameCard.scss";

const GameCard: FC<{
    className?: string,
    itemMind?: ItemEnum,
    flipped: boolean,
    onClick?: (flipped: boolean) => void
}> = ({ className, itemMind, flipped, onClick }) => {

    console.log(itemMind)
    let image, color;
    switch (itemMind) {
        case ItemEnum.GOOD:
            image = good;
            color = "primary";
            break;
        case ItemEnum.BAD:
            image = bad;
            color = "secondary";
            break;
        case ItemEnum.NEUTRAL:
            image = neutral;
            color = "tertiary";
            break;
        case ItemEnum.EMPTY:
        default:
            image = empty;
            color = "tertiary";
            break;
    }

    return (<div className={`text-center ${className}`}>
        <ReactCardFlip isFlipped={flipped}>
            <div className="card" style={{ cursor: onClick ? "pointer" : undefined }} onClick={onClick ? () => onClick(flipped) : undefined}>
                <img src={logo} alt="logo" className="mt-3 mx-auto" style={{ width: "90%" }} />
                <h2 className="mt-3">Mapinguari</h2>
            </div>
            <div className="card" style={{ cursor: onClick ? "pointer" : undefined, borderColor: `var(--${color})` }} onClick={onClick ? () => onClick(flipped) : undefined}>
                <img src={image} alt="logo" className="mt-3 mx-auto" style={{ width: "90%" }} />
                <h2 className="mt-3">Mapinguari</h2>
            </div>
        </ReactCardFlip>
    </div>);
}

export default GameCard;
