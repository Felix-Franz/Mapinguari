import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";

const BackButton : React.FC<{
    className?: string
}> = ({className}) => {
    const {t} = useTranslation();

    const back = () => {
        if (window.history.length > 1)
            window.history.back();
        else
            window.close();
    };

    return  <Button outline color="primary" onClick={back} className={className}>
                <FontAwesomeIcon icon={faArrowCircleLeft} className="mr-2" />
                {t('General.Back')}
            </Button>
}

export default BackButton;