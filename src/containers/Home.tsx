import React from 'react';

// Custom Components
import ErrorBox from "../components/ErrorBox";

// Material Components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

// Material & Custom Styles
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../theme";

class Home extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return ("home...");
    }

}

export default Home