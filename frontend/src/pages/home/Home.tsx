import { useTranslation } from "react-i18next";
import { Alert, Container } from "reactstrap";
import Instructions from "../../components/Instructions";
import Story from "../../components/Story";
import GameConfig from "../../core/GameConfig";
import logo from "../../resources/logo.png";
import StartGame from "./StartGame";

const Home = () => {
    const { t } = useTranslation();
    return (
        <Container fluid className="text-center my-3">
            <img className="w-25" src={logo} alt="logo" draggable="false" />
            <h1 className="mt-1">{t('Home.Title')}</h1>
            <h3>{t('Home.Subtitle', {minPlayers: GameConfig.minPlayers, maxPlayers: GameConfig.maxPlayers})}</h3>
            <StartGame />
            <Alert className="mt-4 mx-auto w-fit" color="danger" style={{ width: "fit-content" }}>
                {/* reactstrap error https://github.com/reactstrap/reactstrap/issues/1833 */}
                Game is under development! Therefore, gaming may still encounter problems.
                <br />
                <a href="https://gitlab.com/FelixFranz/mapinguari" target="_blank noopener" rel="noreferrer">Click here</a> for more information!
            </Alert>
            <Story className="mt-5" />
            <Instructions className="mt-5" />
        </Container>
    );
}

export default Home;
