import {useTranslation} from "react-i18next";

const Home = () => {
    const { t } = useTranslation();
    return (
        <div>{t('Welcome')}</div>
    );
}

export default Home;
