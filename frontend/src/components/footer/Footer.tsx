import "./Footer.scss"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ServiceClient from "../../libraries/ServiceClient";

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
            <a className="mx-1" target="_blank" rel="noreferrer" href={`https://www.felix-franz.com`}>Felix</a>
            <span className={enableLegal ? "" : "d-none"}>| <a target="_blank" rel="noreferrer" href={`${process.env.PUBLIC_URL}/legal`}>{t("Footer.Legal")}</a></span>
        </footer>
    );
}

export default Footer;
