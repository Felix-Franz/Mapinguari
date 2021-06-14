import { useEffect, useState } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Button, Container } from 'reactstrap';
import LegalType from "../../core/types/LegalType";
import ServiceClient from "../../libraries/ServiceClient";

const Legal = () => {
    const { t } = useTranslation();
    const [config, setConfig] = useState<LegalType>({ enabled: false });
    useEffect(() => {
        ServiceClient.getLegal()
            .then(config => {
                if (config.enabled)
                    setConfig(config);
                else
                    window.location.assign(`${process.env.PUBLIC_URL}/`);
            });
    });

    return (
        <Container className="text-center my-3">
            <Button outline color="primary" href={`${process.env.PUBLIC_URL}/`}>
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                    {t('Legal.Button')}
                </Button>

            <div className={config.name || config.address || config.mail || config.phone ? "" : "d-none"}>
                <h1 className="mt-3">{t('Legal.About.Title')}</h1>
                <p className="pre-wrap">{t('Legal.About.PreText')}</p>
                <p>
                    <div className={config.name ? "" : "d-none"}>{config.name}</div>
                    <div className={"pre-wrap " + (config.address ? "" : "d-none")}>{config.address}</div>
                    <div className={config.mail ? "" : "d-none"}>
                        <a href={`mailto:${config.mail}`}>{config.mail}</a>
                    </div>
                    <div className={config.phone ? "" : "d-none"}>
                        <a href={`tel:${config.mail}`}>{config.phone}</a>
                    </div>
                    <div className={config.web ? "" : "d-none"}>
                        <a target="_blank noopener" rel="noreferrer" href={`//${config.web}`}>{config.web}</a>
                    </div>
                </p>
                <p className="pre-wrap">{t('Legal.About.PostText')}</p>
            </div>
            <div>
                <h1 className="mt-3">{t('Legal.Privacy.Title')}</h1>
                <p className="pre-wrap">{t('Legal.Privacy.Content')}</p>
            </div>

            <Button outline color="primary" href={`${process.env.PUBLIC_URL}/`}>
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                    {t('Legal.Button')}
                </Button>
        </Container >
    );
}

export default Legal
