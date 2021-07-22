import { useTranslation } from "react-i18next";

const Instructions = (props: { className?: string }) => {
    const { t } = useTranslation();
    return (
        <div className={`text-center ${props.className}`}>
            <h2>{t("Instructions.Title")}</h2>

            <h3>{t("Instructions.Teams.Title")}</h3>
            <p>{t("Instructions.Teams.General")}</p>
            <p className="text-primary">{t("Instructions.Teams.Good")}</p>
            <p className="text-secondary">{t("Instructions.Teams.Bad")}</p>

            <h3>{t("Instructions.Rounds.Title")}</h3>
            <ol>
                {(t("Instructions.Rounds.Content", { returnObjects: true }) as string[]).map((c, i) =>
                    <li key={i}>{c}</li>
                )}
            </ol>

            <h3 className="text-primary">{t("Instructions.HintsGood.Title")}</h3>
            <ul>
                {(t("Instructions.HintsGood.Content", { returnObjects: true }) as string[]).map((c, i) =>
                    <li className="text-primary" key={i}>{c}</li>
                )}
            </ul>

            <h3 className="text-secondary">{t("Instructions.HintsBad.Title")}</h3>
            <ul className="text-secondary">
                {(t("Instructions.HintsBad.Content", { returnObjects: true }) as string[]).map((c, i) =>
                    <li key={i}>{c}</li>
                )}
            </ul>
        </div>
    );
}

export default Instructions;
