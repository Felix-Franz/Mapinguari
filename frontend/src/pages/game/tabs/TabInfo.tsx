import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";
import Instructions from "../../../components/Instructions";

const TabInfo = () => {
    const { t } = useTranslation();

    return <Container className="my-3"><Instructions /></Container>
};

export default TabInfo;