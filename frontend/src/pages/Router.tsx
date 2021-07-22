import Home from "./home/Home";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";
import Error from "./error/Error";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Game from "./game/Game";
import Toast from "../components/toast/Toast";
import AlertModal from "../components/AlertModal";
import Imprint from "./imprint/Imprint";
import PrivacyPolicy from "./privacypolicy/PrivacyPolicy";

const Router = () => (<>
    <div style={{ minHeight: "calc( 100vh - 4em )", display: "flow-root", marginBottom: "3em", position: "relative"}} className="no-user-select">

        <Toast/>
        <Menu />
        <AlertModal/>

        <BrowserRouter>
            <Switch>
                <Route exact path="/game/:code" component={Game} />
                <Route exact path="/imprint" component={Imprint} />
                <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                <Route exact path="/" component={Home} />
                <Route component={Error} />
            </Switch>
        </BrowserRouter>
    </div>

    <Footer />
</>);


export default Router;
