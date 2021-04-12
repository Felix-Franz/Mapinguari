import Home from "./home/Home";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";
import Error from "./error/Error";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Legal from "./legal/Legal";
import Game from "./game/Game";
import Toast from "../components/toast/Toast";
import AlertModal from "../components/AlertModal";

const Router = () => (<>
    <div style={{ minHeight: "calc( 100vh - 4em )", display: "flow-root", marginBottom: "3em", position: "relative"}}>

        <Toast/>
        <Menu />
        <AlertModal/>

        <BrowserRouter>
            <Switch>
                <Route exact path="/game/:code" component={Game} />
                <Route exact path="/legal" component={Legal} />
                <Route exact path="/" component={Home} />
                <Route component={Error} />
            </Switch>
        </BrowserRouter>
    </div>

    <Footer />
</>);


export default Router;
