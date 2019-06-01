import React from "react";
import CircularProgressExt from '../components/CircularProgressExt';
import Typography from '@material-ui/core/Typography';

interface VoteInterface {
    candidate: string;
    progress: number;
}

class Vote extends React.Component<VoteInterface, VoteInterface> {

    constructor (props: VoteInterface) {
        super(props);
        this.state = {
            candidate: this.props.candidate,
            progress: this.props.progress,
        };
    }

    render() {
        return (
            <Typography className="voteStatus label" variant="body2" gutterBottom>
                <span>{this.state.candidate}</span>
                <CircularProgressExt progress={this.state.progress} />
            </Typography>
        );
    }

}

export default Vote;