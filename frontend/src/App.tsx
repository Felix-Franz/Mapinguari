import {Suspense} from 'react';
import './App.css';
import Loader from "./pages/loader/Loader";
import Router from "./pages/Router";
import {createMuiTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import {cyan, red} from "@material-ui/core/colors";

export default function App() {
    const theme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: cyan["A400"]
            },
            secondary: {
                main: red[700],
            },
        },
    });

    return (

        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Suspense fallback={<Loader/>}>
                <Router/>
            </Suspense>
        </MuiThemeProvider>
    );
}

