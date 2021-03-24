import {useTranslation} from "react-i18next";
import {Button} from "reactstrap";

const StartGame = () => {
    const {t} = useTranslation();
    return (
        <div className="w-75 mx-auto mt-4" style={{
            border: "1px solid var(--primary)",
            borderRadius: "1em",
            padding: "1em"
        }}>
            <h3>{t("StartGame.Ready")}</h3>
            <Button color="primary" outline size="lg" className="mt-1 w-75">
                <span className="mr-2">🎲</span>{t("StartGame.Join Table")}
            </Button>
            <br/>
            <Button color="primary" outline size="lg" className="mt-1 w-75">
                <span className="mr-2">🆕</span>{t("StartGame.Create Table")}
            </Button>
        </div>
    );
}

export default StartGame;
