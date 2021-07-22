import { Container, Spinner } from "reactstrap";
import logo from "../../resources/logo.png";

// loading component for suspense fallback etc.
const Loader = () => (
    <Container fluid className="text-center my-3 no-user-select">
        <img className="mt-5 w-50" src={logo} alt="logo" draggable="false" />
        <div className="mt-2">
            <Spinner color="primary" className="align-middle" />
            <span className="ml-2 align-middle">Loading...</span>
        </div>
    </Container>
);

export default Loader;
