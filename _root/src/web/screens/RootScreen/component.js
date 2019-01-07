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

    const diff = lastSeenAt - seenAt; 

    return (
      <div className={classes.root}>
        <div>Start developing on RootScreen component</div>
        <div>You didn't refresh for {diff}ms</div>
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
