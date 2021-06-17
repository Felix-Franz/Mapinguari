import { Container } from "reactstrap";
import Instructions from "../../../components/Instructions";

const TabInfo: React.FC<{
    className?: string
}> = ({ className }) => {
    return <Container className={`my-3 ${className || ""}`}>
        <Instructions />
    </Container>
};

export default TabInfo;