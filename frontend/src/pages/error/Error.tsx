import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Button, Container } from 'reactstrap';
import logo from "../../resources/logo.svg";

const Error = () => {
    const { t } = useTranslation();
    const back = () => {
        if (window.history.length > 1)
            window.history.back();
        else
            window.location.assign(process.env.PUBLIC_URL + "/");
    };

    return (
        <Container fluid className="text-center my-3">
            <img className="mt-3" src={logo} alt="logo" />
            <h1 className="mt-3">{t('Error.Title')}</h1>
            <p>{t('Error.Text')}</p>
            <Button color="primary" onClick={back}>
                <FontAwesomeIcon icon={faArrowCircleLeft} className="mr-2" />
                    Step back
                </Button>
        </Container >
    );
}

export default Error
