import "./Footer.scss"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ServiceClient from "../../libraries/ServiceClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    const { t } = useTranslation();
    const [enableImprint, setEnableImprint] = useState<boolean>(false);
    const [enablePrivacyPolicy, setEnablePrivacyPolicy] = useState<boolean>(false);
    useEffect(() => {
        ServiceClient.getLegal()
            .then(config => {
                setEnableImprint(!!config.imprint);
                setEnablePrivacyPolicy(config.privacyPolicy);
            })
            .catch(() => {
                setEnableImprint(false);
                setEnablePrivacyPolicy(false);
            });
    });

    return (
        <footer className="footer box-shadow">
            <span>{t("Footer.Made", {love: "❤️"})} </span>
            <a target="_blank" rel="noreferrer noopener" href={`https://www.felix-franz.com`}>Felix</a>
            <br />
            <span><a target="_blank" rel="noopener noreferrer" href="https://gitlab.com/FelixFranz/mapinguari"><FontAwesomeIcon icon={faGitlab} className="mr-1" />{t("Footer.Source")}</a></span>
            <span className={(enableImprint ? "" : "d-none")}> | <a target="_blank" rel="noopener noreferrer" href={`${process.env.PUBLIC_URL}/imprint`}>{t("Footer.Imprint")}</a></span>
            <span className={(enablePrivacyPolicy ? "" : "d-none")}> | <a target="_blank" rel="noopener noreferrer" href={`${process.env.PUBLIC_URL}/privacy-policy`}>{t("Footer.PrivacyPolicy")}</a></span>
        </footer>
    );
}

export default Footer;
