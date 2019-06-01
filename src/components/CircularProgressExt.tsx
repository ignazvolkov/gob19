import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

interface Props {
    progress: number;
}

class CircularProgressExt extends React.Component<Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {
            progress: props.progress,
        };
    }

    render() {
        return (
            <span className="circularProgress">
                <Typography className="tag" gutterBottom>
                    <span>{this.state.progress}</span>
                </Typography>
                <CircularProgress className="circle circle-bg" variant="static" value={100} />
                <CircularProgress className="circle" variant="static" value={this.state.progress} />
            </span>
        );
    }

}

export default CircularProgressExt