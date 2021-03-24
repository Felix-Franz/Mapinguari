import {Suspense} from 'react';
import './App.css';
import Loader from "./pages/loader/Loader";
import Router from "./pages/Router";
import {CssBaseline, MuiThemeProvider} from "@material-ui/core";
import {Theme} from "./Theme";

export default function App() {
    return (
        <MuiThemeProvider theme={Theme}>
            <CssBaseline/>
            <Suspense fallback={<Loader/>}>
                <Router/>
            </Suspense>
        </MuiThemeProvider>
    );
}

