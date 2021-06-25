import { useTranslation } from "react-i18next";
import { Alert, Container } from "reactstrap";
import Instructions from "../../components/Instructions";
import Story from "../../components/Story";
import logo from "../../resources/logo.svg";
import StartGame from "./StartGame";

const Home = () => {
    const { t } = useTranslation();
    return (
        <Container fluid className="text-center my-3">
            <img className="mt-3" src={logo} alt="logo" draggable="false" />
            <h1 className="mt-3">{t('Home.Title')}</h1>
            <h3>{t('Home.Subtitle')}</h3>
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
