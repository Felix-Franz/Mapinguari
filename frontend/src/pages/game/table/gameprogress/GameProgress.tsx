import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./GameProgress.scss";
import { Col, Row } from "reactstrap";
import { FC } from "react";
import GameConfig from "../../../../core/GameConfig";
import { useTranslation } from "react-i18next";

const GameProgress: FC<{
    round: number,
    card: number
}> = ({ round, card }) => {
    const { t } = useTranslation();

    const percent = (GameConfig.initalCardsPerPlayer * (round - 1) + card) / (GameConfig.rounds * GameConfig.initalCardsPerPlayer) * 100;

    return <Row className="mx-1">
        <Col xs="12" md="10" className="mt-3">
            <ProgressBar percent={percent} filledBackground="linear-gradient(to right, var(--primary), var(--secondary))">
                <Step transition="scale">
                    {({ accomplished, index }) =>
                        <div className="gameprogress-step" style={{ backgroundColor: `var(${accomplished ? "--secondary" : "--primary"})` }}>
                            <div>{index + 1}</div>
                        </div>
                    }
                </Step>
                <Step transition="scale">
                    {({ accomplished, index }) =>
                        <div className="gameprogress-step" style={{ backgroundColor: `var(${accomplished ? "--secondary" : "--primary"})` }}>
                            <div>{index + 1}</div>
                        </div>
                    }
                </Step>
                <Step transition="scale">
                    {({ accomplished, index }) =>
                        <div className="gameprogress-step" style={{ backgroundColor: `var(${accomplished ? "--secondary" : "--primary"})` }}>
                            <div>{index + 1}</div>
                        </div>
                    }
                </Step>
                <Step transition="scale">
                    {({ accomplished, index }) =>
                        <div className="gameprogress-step" style={{ backgroundColor: `var(${accomplished ? "--secondary" : "--primary"})` }}>
                            <div>{index + 1}</div>
                        </div>
                    }
                </Step>
                <Step transition="scale">
                    {({ accomplished }) =>
                        <div className="gameprogress-step" style={{ backgroundColor: `var(${accomplished ? "--secondary" : "--primary"})` }}>
                            <div>⚡</div>
                        </div>
                    }
                </Step>
            </ProgressBar>
        </Col>
        <Col xs="12" md="2" className="mt-2 mt-md-0 text-center">
            <div>{t("Game.Table.GameProgress.Rounds")}: {round}/{GameConfig.rounds}</div>
            <div>{t("Game.Table.GameProgress.Cards")}: {card}/{GameConfig.initalCardsPerPlayer}</div>
        </Col>
    </Row>
}

export default GameProgress;