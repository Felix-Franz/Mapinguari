import "./Footer.scss"
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();
    return (
        <footer className="footer box-shadow">
            <span>{t("Footer.Made")} </span>
           <a className="mx-1" target="_blank" rel="noreferrer" href={`https://www.felix-franz.com`}>Felix</a>
            <span>| <a target="_blank"  rel="noreferrer" href={`${process.env.PUBLIC_URL}/legal`}>{t("Footer.Legal")}</a></span>
        </footer>
    );
}

export default Footer;
