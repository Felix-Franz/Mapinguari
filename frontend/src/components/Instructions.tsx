import {useTranslation} from "react-i18next";

const Instructions = (props: { className?: string }) => {
    const {t} = useTranslation();
    return (
        <div className={props.className}>
            <h2>{t("Instructions.Title")}</h2>
            ToDo!
        </div>
    );
}

export default Instructions;
