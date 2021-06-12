import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { Col, Row } from "reactstrap";
import GameConfig from "../../../../core/GameConfig";
import CardType from "../../../../core/types/CardType";
import PlayerType from "../../../../core/types/PlayerType";
import "./GameProgress.scss";

const GameProgress: FC<{
    cards: CardType[],
    players: PlayerType[]
}> = ({ cards, players }) => {
    const { t } = useTranslation();

    const allCards = players.map(p => p.cards!).reduce((prev, c) => prev.concat(c), []).concat(cards)
    const percent = (allCards.filter(c => c.visible).length) / (0.8 * allCards.length) * 100;
    const round = cards.length / players.length + 1;
    const move = players.map(p => p.cards!).reduce((prev, c) => prev.concat(c), []).filter(c => c.visible).length + 1;

    return <Row className="mx-1">
        <Col xs="12" md="10" className="mt-3">
            <ProgressBar percent={percent} filledBackground="linear-gradient(to right, var(--primary), var(--secondary))">
                <Step transition="scale">
                    {({ accomplished, index }) =>
                        <div className="gameprogress-step" style={{ backgroundColor: `var(${accomplished ? "--primary" : "--secondary"})` }}>
                            <div>{index + 1}</div>
                        </div>
                    }
                </Step>
                <Step transition="scale">
                    {({ accomplished, index }) =>
                        <div className="gameprogress-step" style={{ backgroundColor: `var(${accomplished ? "--primary" : "--secondary"})` }}>
                            <div>{index + 1}</div>
                        </div>
                    }
                </Step>
                <Step transition="scale">
                    {({ accomplished, index }) =>
                        <div className="gameprogress-step" style={{ backgroundColor: `var(${accomplished ? "--primary" : "--secondary"})` }}>
                            <div>{index + 1}</div>
                        </div>
                    }
                </Step>
                <Step transition="scale">
                    {({ accomplished, index }) =>
                        <div className="gameprogress-step" style={{ backgroundColor: `var(${accomplished ? "--primary" : "--secondary"})` }}>
                            <div>{index + 1}</div>
                        </div>
                    }
                </Step>
                <Step transition="scale">
                    {({ accomplished }) =>
                        <div className="gameprogress-step" style={{ backgroundColor: `var(${accomplished ? "--primary" : "--secondary"})` }}>
                            <div>⚡</div>
                        </div>
                    }
                </Step>
            </ProgressBar>
        </Col>
        <Col xs="12" md="2" className="mt-2 mt-md-0 text-center" style={{ display: round > GameConfig.rounds ? "none" : undefined }}>
            <div>{t("Game.Table.GameProgress.Round")}: {round}/{GameConfig.rounds}</div>
            <div>{t("Game.Table.GameProgress.Move")}: {move}/{players.length}</div>
        </Col>
        <Col xs="12" md="2" className="mt-2 mt-md-0 text-center" style={{ display: round > GameConfig.rounds ? undefined : "none" }}>
            <div className="pre-wrap">{t("Game.Table.GameProgress.Over")}</div>
        </Col>
    </Row>
}

export default GameProgress;