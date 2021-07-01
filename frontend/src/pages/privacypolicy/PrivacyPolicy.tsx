import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container } from 'reactstrap';
import BackButton from "../../components/BackButton";
import ServiceClient from "../../libraries/ServiceClient";

const PrivacyPolicy = () => {
    const { t } = useTranslation();
    useEffect(() => {
        ServiceClient.getLegal()
            .then(config => {
                if (!config.privacyPolicy)
                    window.location.assign(`${process.env.PUBLIC_URL}/`);
            });
    });

    return (
        <Container className="text-center my-3">
            <BackButton />
            <div>
                <h1 className="mt-3">{t('PrivacyPolicy.Title')}</h1>
                <p className="pre-wrap">{t('PrivacyPolicy.Content')}</p>
            </div>
            <BackButton className="mt-2"/>
        </Container >
    );
}

export default PrivacyPolicy
