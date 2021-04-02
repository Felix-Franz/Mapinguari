import "./Footer.scss"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ServiceClient from "../../libraries/ServiceClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    const { t } = useTranslation();
    const [enableLegal, setEnableLegal] = useState<boolean>(false);
    useEffect(() => {
        ServiceClient.getLegal()
            .then(config => {
                setEnableLegal(config.enabled);
            });
    });

    return (
        <footer className="footer box-shadow">
            <span>{t("Footer.Made")} </span>
            <a target="_blank" rel="noreferrer" href={`https://www.felix-franz.com`}>Felix</a>
            <br />
            <span><a target="_blank" rel="noreferrer" href={`${process.env.PUBLIC_URL}/legal`}><FontAwesomeIcon icon={faGitlab} className="mr-1" />{t("Footer.Source")}</a></span>
            <span className={(enableLegal ? "" : "d-none")}> | <a target="_blank" rel="noreferrer" href={`${process.env.PUBLIC_URL}/legal`}>{t("Footer.Legal")}</a></span>
        </footer>
    );
}

export default Footer;
