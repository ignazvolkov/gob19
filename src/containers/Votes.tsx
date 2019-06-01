import React from 'react';

// Custom Components
import ErrorBox from "../components/ErrorBox";
import Vote from "../components/Vote";

// Services
import Session from "../services/session";
import Trans from "../services/trans";
import Auth from "../services/auth";

// Custom Models
import Candidate from "../models/candidate";

// Material Components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ExitToApp, PersonAdd } from "@material-ui/icons";


// Material & Custom Styles
import { MuiThemeProvider } from "@material-ui/core";
import theme from "../theme";

class Votes extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            errors: [],
            dialog: false,
            edit: false,
            buffer: [],
            candidate: new Candidate(),
            votes: this.getVotes(),
        };
    }

    setName = (name: string) => {
        this.setState({
            candidate: this.state.candidate.setName(name)
        });
    }

    setVotes = (votes: string) => {
        this.setState({
            candidate: this.state.candidate.setVotes(votes)
        });
    }

    getVotes = () => {
        return Session.get("votes");
    }

    updateList = () => {
        this.setState({
            votes: this.getVotes(),
        });
    }

    addCandidate = () => {
        this.state.candidate.save();
        this.updateList();
        this.dialogClose()
    }

    editCandidate = () => {
        this.setState({
            buffer: [],
        });
        this.addCandidate();
    }

    dialogOpen = (index: number | null = null) => {
        if (index != null) {
            let votes = this.getVotes();
            let candidate = votes[index];
            this.state.candidate.setName(candidate.name);
            this.state.candidate.setVotes(candidate.votes);
            votes.splice(index, 1);
            Session.put({
                votes: votes,
            });
            this.setState({ edit: true });
        }
        this.setState({ dialog: true });
    }

    deleteCandidate = () => {
        this.setState({ edit: false });
        this.dialogClose();
    }
    
    dialogClose = () => {
        if (this.state.edit == true) {
            Session.put({
                votes: this.state.buffer,
            });
        }
        this.setState({ dialog: false });
        this.setState({ buffer: [] });
        this.updateList();
    }

    endSession = () => {
        // Auth.logout();
    }

    editVote = (index: number) => {
        this.setState({
            buffer: this.getVotes(),
        });
        this.setState({edit: true});
        this.dialogOpen(index);
    }

    render() {
        let votes: any = this.state.votes;
        let data: any = votes != null ? (
            votes.map((candidate: any, index: number) => {
                let name: string = candidate.name;
                let votes: number = parseInt(candidate.votes);
                return (
                    <div onClick={(e) => this.editVote(index)}>
                        <Vote key={index} candidate={name} progress={votes} />
                    </div>
                );
            })
        ) :  (
            <ErrorBox className="pad-bottom" message={Trans.Messages.votesNotFound} />
        );
        return (
            <MuiThemeProvider theme={theme}>
                <AppBar position="sticky">
                    <Toolbar className="justify-right">
                        <PersonAdd onClick={() => { this.dialogOpen() } } className="navbar-icon" />
                        <ExitToApp onClick={this.endSession} className="navbar-icon" />
                    </Toolbar>
                </AppBar>
                <Grid container className="pad-top" direction="column" justify="center" alignItems="center">
                    <Dialog open={this.state.dialog} onClose={this.dialogClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">{Trans.UI.candidateDialogTitle}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {Trans.UI.candidateDialogText}
                            </DialogContentText>
                            <div className="form-group">
                                <TextField className="form-control m-unset full-width" label={Trans.UI.candidatePlaceholder} placeholder={Trans.UI.candidatePlaceholder} onChange={(e) => { this.setName(e.target.value) }} />
                            </div>
                            <div className="form-group">
                                <TextField type="number" className="form-control m-unset full-width" label={Trans.UI.votesPlaceholder} placeholder={Trans.UI.votesPlaceholder} onChange={(e) => { this.setVotes(e.target.value) }} />
                            </div>
                            <div className="pad-top pull-right">
                                <Button onClick={this.dialogClose} color="secondary">{Trans.UI.cancelBtn}</Button>
                                <Button onClick={this.addCandidate} color="primary">{Trans.UI.saveBtn}</Button>
                                <Button onClick={this.deleteCandidate}>{Trans.UI.deleteBtn}</Button>
                                <Button onClick={this.editCandidate} color="primary">{Trans.UI.editBtn}</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </Grid>
                <Grid container direction="column" className="container center max-sm">
                    <Paper className="content-box m-default">{data}</Paper>
                </Grid>
            </MuiThemeProvider>
        );
    }

}

export default Votes