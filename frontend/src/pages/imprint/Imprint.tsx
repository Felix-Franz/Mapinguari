import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from 'reactstrap';
import BackButton from "../../components/BackButton";
import ImprintType from "../../core/types/ImprintType";
import ServiceClient from "../../libraries/ServiceClient";

const Imprint = () => {
    const { t } = useTranslation();
    const [imprint, setImprint] = useState<ImprintType>();
    useEffect(() => {
        ServiceClient.getImprint()
            .then(imprint => {
                if (imprint)
                    setImprint(imprint);
                else
                    window.location.assign(`${process.env.PUBLIC_URL}/`);
            });
    }, []);

    return (
        <Container className="text-center my-3">
            <BackButton className="mb-1" />

            {imprint ?
                <>
                    <h1 className="mt-3">{t('Imprint.Title')}</h1>
                    <p className="pre-wrap">{t('Imprint.PreText')} <a href="https://www.gesetze-im-internet.de/tmg/__5.html" target="_blank" rel="noopener noreferrer">§ 5 TMG</a></p>
                    <div className={imprint.name ? "" : "d-none"}>{imprint.name}</div>
                    <div className={"pre-wrap " + (imprint.address ? "" : "d-none")}>{imprint.address}</div>
                    <div className={imprint.mail ? "" : "d-none"}>
                        <a href={`mailto:${imprint.mail}`}>{imprint.mail}</a>
                    </div>
                    <div className={imprint.phone ? "" : "d-none"}>
                        <a href={`tel:${imprint.mail}`}>{imprint.phone}</a>
                    </div>
                    <div className={imprint.web ? "" : "d-none"}>
                        <a target="_blank" rel="noopener noreferrer" href={`//${imprint.web}`}>{imprint.web}</a>
                    </div>
                    <p className="pre-wrap mt-3">{t('Imprint.PostText')}</p>
                </>
                : ""}

            <BackButton className="mt-3" />
        </Container >
    );
}

export default Imprint
