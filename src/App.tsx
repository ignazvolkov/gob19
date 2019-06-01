import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router";
import Paths from './services/paths';
import Login from "./containers/Login";
import Votes from "./containers/Votes";

class App extends Component {

    render() {
        return (
			<Router>
				<Route exact path={Paths.login} component={Login} />
				<Route exact path={Paths.votes} component={Votes} />
			</Router>
        );
    }

}

export default App;
