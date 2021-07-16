import { useTranslation } from "react-i18next";
import { Container } from 'reactstrap';
import BackButton from "../../components/BackButton";
import logo from "../../resources/logo.png";

const Error = () => {
    const { t } = useTranslation();

    return (
        <Container fluid className="text-center my-3">
            <img className="mt-3 w-25" src={logo} alt="logo" draggable="false" />
            <h1 className="mt-3">{t('Error.Title')}</h1>
            <p>{t('Error.Text')}</p>
            <BackButton />
        </Container >
    );
}

export default Error
