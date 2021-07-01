import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from 'reactstrap';
import BackButton from "../../components/BackButton";
import ImprintType from "../../core/types/ImprintType";
import ServiceClient from "../../libraries/ServiceClient";

const Imprint = () => {
    const { t } = useTranslation();
    const [config, setConfig] = useState<ImprintType>();
    useEffect(() => {
        ServiceClient.getLegal()
            .then(config => {
                if (!!config.imprint)
                    setConfig(config.imprint);
                else
                    window.location.assign(`${process.env.PUBLIC_URL}/`);
            });
    }, []);

    return (
        <Container className="text-center my-3">
            <BackButton className="mb-1" />

            {config ?
                <>
                    <h1 className="mt-3">{t('Imprint.Title')}</h1>
                    <p className="pre-wrap">{t('Imprint.PreText')} <a href="https://www.gesetze-im-internet.de/tmg/__5.html" target="_blank" rel="noopener noreferrer">§ 5 TMG</a></p>
                    <div className={config.name ? "" : "d-none"}>{config.name}</div>
                    <div className={"pre-wrap " + (config.address ? "" : "d-none")}>{config.address}</div>
                    <div className={config.mail ? "" : "d-none"}>
                        <a href={`mailto:${config.mail}`}>{config.mail}</a>
                    </div>
                    <div className={config.phone ? "" : "d-none"}>
                        <a href={`tel:${config.mail}`}>{config.phone}</a>
                    </div>
                    <div className={config.web ? "" : "d-none"}>
                        <a target="_blank" rel="noopener noreferrer" href={config.web}>{config.web}</a>
                    </div>
                    <p className="pre-wrap mt-3">{t('Imprint.PostText')}</p>
                </>
                : ""}

            <BackButton className="mt-3" />
        </Container >
    );
}

export default Imprint
