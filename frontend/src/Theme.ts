import core, {createMuiTheme, createStyles, makeStyles} from "@material-ui/core";
import {cyan, red} from "@material-ui/core/colors";

export const Theme = createMuiTheme({
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


export const useStyles = makeStyles((theme: core.Theme) => createStyles({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    textCenter: {
        textAlign: "center"
}
}));
