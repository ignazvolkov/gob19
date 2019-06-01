import { createMuiTheme, colors } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            dark: "#1e88e5",
            main: "#2196f3",
            light: "#42a5f5",
            contrastText: "#fafafa",
        },
        secondary: {
            dark: "#d32f2f",
            main: "#f44336",
            light: "#ef5350",
            contrastText: "#fafafa",
        }
    }
});

export default theme;