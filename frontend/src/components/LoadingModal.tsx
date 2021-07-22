import { useTranslation } from "react-i18next";
import { Modal, Spinner } from "reactstrap";

const LoadingModal: React.FC<{ show: boolean }> = ({ show }) => {
const {t} = useTranslation();

    return (
        <Modal isOpen={show} style={{ top: "40%", width: "max-content" }} className="mx-auto no-user-select">
            <div className="m-2 rounded">
                <Spinner color="primary" className="align-middle mr-3" />
                <span>{t("General.Loading")}</span>
            </div>
        </Modal>
    );
}

export default LoadingModal;