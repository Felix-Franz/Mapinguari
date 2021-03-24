import {useTranslation} from "react-i18next";
import {Button} from "@material-ui/core";
import {Today} from "@material-ui/icons";

function Home() {
    const {t, i18n} = useTranslation();

    const changeLanguage = (lng: any) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <Today/>
            <Button onClick={() => changeLanguage('de')} variant="contained" color="primary">de</Button>
            <Button onClick={() => changeLanguage('en')} variant="contained" color="secondary">en</Button>
            <div>{t('Welcome')}</div>
        </>
    );
}

export default Home;
