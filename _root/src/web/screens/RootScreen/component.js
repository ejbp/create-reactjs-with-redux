import React from "react";
import { withStyles } from "@material-ui/core/styles";

class RootScreen extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      lastSeenAt: props.lastSeenAt
    };

  }

  componentWillMount() {
    this.props.touch();
  }

  render() {
    const {classes, lastSeenAt:seenAt } = this.props;
    const { lastSeenAt } = this.state;

    const diff = Math.round( (seenAt - lastSeenAt) / 1000); 

    return (
      <div className={classes.root}>
        <ul>
          <li>Start developing on RootScreen component</li>
          <li>You didn't refresh for {diff}s</li>
        </ul>
      </div>
    );
  
  }
}

const styles = {
  root: {
    width: '100%',
    height: '100%'
  }
}

export default withStyles(styles)(RootScreen);
