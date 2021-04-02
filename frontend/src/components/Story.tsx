import {useTranslation} from "react-i18next";

const Story = (props: { className?: string }) => {
    const {t} = useTranslation();
    return (
        <div className={props.className}>
            <h2>{t("Story.Title")}</h2>
            ToDo!
        </div>
    );
}

export default Story;
