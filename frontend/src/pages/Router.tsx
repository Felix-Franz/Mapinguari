import Home from "./home/Home";
import Menu from "../components/menu/Menu";
import Footer from "../components/footer/Footer";
import Error from "./error/Error";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Router = () => (<>
    <div style={{ minHeight: "calc( 100vh - 3em )", display: "flow-root", marginBottom: "3em" }}>
        <Menu />

        <BrowserRouter>
            <Switch>
                <Route exact path={`/`} render={(props) => <Home />} />
                <Route exact path='*' render={(props) => <Error/>} />
            </Switch>
        </BrowserRouter>
    </div>
    <Footer />
</>);


export default Router;
