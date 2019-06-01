import React from "react";
import Typography from '@material-ui/core/Typography';
import { WarningSharp } from "@material-ui/icons";

interface Props {
    message: string;
    size?: string;
    className?: string;
}

class ErrorBox extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Typography className={this.props.className + " error-box " + this.props.size} variant="body2" gutterBottom>
                <WarningSharp className="icon" />
                <span>{this.props.message}</span>
            </Typography>
        );
    }
}

export default ErrorBox;