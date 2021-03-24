import Home from "./home/Home";
import Menu from "../components/menu/Menu";
import Footer from "../components/Footer/Footer";

const Router = () => (<>
    <div style={{minHeight: "calc( 100vh - 3em )", display: "flow-root", marginBottom: "3em"}}>
        <Menu/>
        <Home/>
    </div>
    <Footer/>
</>);


export default Router;
