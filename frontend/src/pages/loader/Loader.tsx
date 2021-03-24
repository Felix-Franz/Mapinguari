import {Avatar, Box, CircularProgress, Typography} from "@material-ui/core";
import logo from "../../resources/logo.svg"
import {useStyles} from "../../Theme";
import "./Loader.css";

// loading component for suspense fallback
const Loader = () => {
    const classes = useStyles();
    return (
        <Box mx="auto" width="fit-content">
            <Avatar src={logo} alt="Logo" className="loader-logo"/>
            <CircularProgress/> Loading...
        </Box>
    );
}

export default Loader;
