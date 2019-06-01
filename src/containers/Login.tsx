import React from 'react';

// Models
import Preloader from "../models/preloader";
import Account from "../models/account";

// Custom Components
import ErrorBox from "../components/ErrorBox";

// Material Components
import Grid from "@material-ui/core/Grid";
import { AccountCircle } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

// Material & Custom Styles
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../theme";

class Login extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            loaded: false,
            locked: false,
            preloader: Preloader.mode.stop,
            account: new Account(),
            errors: [],
        };
    }

    clearErrors = () => {
        this.setState({errors: []});
    }

    setUsername = (user: string) => {
        this.setState({
            account: this.state.account.setUsername(user)
        });
    }

    setPassword = (pass: string) => {
        this.setState({
            account: this.state.account.setPassword(pass)
        });
    }

    tryLogin = (form: any) => {
        form.preventDefault();
        this.clearErrors();
        this.setState({preloader: Preloader.mode.animate});
        setTimeout(() => {
            this.connect((response: any) => {
                if (!this.state.locked) {
                    this.setState({locked: true});
                    if (response != true) {
                        this.setState({preloader: Preloader.mode.stop});
                        this.setState({errors: response.errors});
                        this.setState({locked: false});
                    }
                } else {
                    this.setState({preloader: Preloader.mode.stop});
                    this.setState({locked: false});
                }
            });
        }, 2000);
    }

    connect = (callback: any) => {
        this.state.account.connect((response: any) => {
            if (response.state == Account.CONNECTED_STATE) {
                this.state.account.auth.redirect();
                callback(true);
            } else {
                callback({errors: response.errors});
            }
        });
    }

    render () {
        if (!this.state.loaded) {
            this.setState({loaded: true});
            let tokenExists: boolean = this.state.account.auth.checkToken();
            console.log(tokenExists);
            if (tokenExists) {
                this.state.account.auth.redirect();
            }
        }
        let disabled: boolean = this.state.preloader ? true : false;
        let active: string = disabled ? "active" : "";
        return (
            <MuiThemeProvider theme={theme}>
                <Grid container direction="column" justify="center" alignItems="center" className="container full-vh">
                    <AccountCircle className="login-thumbnail" />
                    <Paper className="content-box mt-unset">
                        <form id="form-login" action="#" method="get" className="pad-top pad-bottom" onSubmit={this.tryLogin}>
                            <TextField onChange={(e) => { this.setUsername(e.target.value) }} disabled={disabled} className="form-control" label="Usuario" name="username" autoComplete="off" autoFocus></TextField>
                            <TextField onChange={(e) => { this.setPassword(e.target.value) }} disabled={disabled} className="form-control" label="Contraseña" name="password" type="password"></TextField>
                            <LinearProgress className={"linear-progress " + active} color="primary" />
                            <div onClick={this.clearErrors}>
                                {this.state.errors.map((message: string, index: number) => {
                                    return <ErrorBox key={index} size="sm" message={message} />
                                })}
                            </div>
                            <Button disabled={disabled} className="form-button" type="submit" variant="contained" color="primary">Iniciar Sesión</Button>
                        </form>
                    </Paper>
                </Grid>
            </MuiThemeProvider>
        );
    }

}

export default Login;