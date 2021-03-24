import {useTranslation} from "react-i18next";
import {Container} from "reactstrap";
import logo from "../../resources/logo.svg";
import StartGame from "./StartGame";
import Instructions from "../../components/Instructions";

const Home = () => {
    const {t} = useTranslation();
    return (
        <Container fluid className="text-center mt-3">
            <img className="mt-3" src={logo} alt="logo"/>
            <h1 className="mt-3">{t('Home.Title')}</h1>
            <h3>{t('Home.Subtitle')}</h3>
            <StartGame/>
            <Instructions className="mt-5 mb-2"/>
        </Container>
    );
}

export default Home;
