import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from 'reactstrap';
import BackButton from "../../components/BackButton";
import ServiceClient from "../../libraries/ServiceClient";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import AlertModal from "../../components/AlertModal";
import "./PrivacyPolicy.scss";

const PrivacyPolicy = () => {
    const { t, i18n } = useTranslation();
    const [privacyPolicy, setPrivacyPolicy] = useState<string>();
    useEffect(() => {
        ServiceClient.getPrivacyPolicy(i18n.language.slice(0, 2))
            .then(privacyPolicy => {
                if (!privacyPolicy)
                    window.location.assign(`${process.env.PUBLIC_URL}/`);
                else
                    setPrivacyPolicy(privacyPolicy);
            })
            .catch(() =>
                window.location.assign(`${process.env.PUBLIC_URL}/`)
            );
    });

    const deleteLocal = () => {
        AlertModal.show({
            header: t("PrivacyPolicy.DeleteLocal.AlertHeader"),
            message: t("PrivacyPolicy.DeleteLocal.AlertMessage"),
            buttons: [{
                text: t("General.Yes"),
                handler: () => localStorage.clear()
            }, t("General.No")]
        })
    }

    return (
        <Container className="text-center my-3">
            <BackButton />
            <div className="privacy-policy">
                <h1 className="mt-3">{t('PrivacyPolicy.Title')}</h1>
                <div dangerouslySetInnerHTML={{"__html": privacyPolicy!}}></div>
                <Button outline color="primary" className="mt-4" onClick={deleteLocal}>
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    {t('PrivacyPolicy.DeleteLocal.Button')}
                </Button>
            </div>

            <BackButton className="mt-2"/>
        </Container >
    );
}

export default PrivacyPolicy
