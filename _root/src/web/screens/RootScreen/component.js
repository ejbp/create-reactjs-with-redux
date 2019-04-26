import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';
import UserProfile from 'src_web/components/UserProfile';

class RootScreen extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      lastSeenAt: props.lastSeenAt
    };

    this.handleFetchUser = this.handleFetchUser.bind(this);
  }

  componentWillMount() {
    this.props.touch();
  }

  handleFetchUser() {
    this.props.fetchUser();  
  }

  render() {
    const { classes, lastSeenAt:seenAt, user, uiState } = this.props;
    const { fetching:userIsFetching} = uiState.user;
    const { lastSeenAt } = this.state;

    const diff = Math.round( (seenAt - lastSeenAt) / 1000); 

    return (
      <div className={classes.root}>
        <ul>
          <li>Start developing on RootScreen component</li>
          <li>You didn't refresh for {diff}s</li>
        </ul>
        {
          !userIsFetching && !!user &&
            <UserProfile user={user} />
        }
        {
          userIsFetching && "Loading..."
        }
        <button onClick={this.handleFetchUser}>Fetch a User to redux</button>
      </div>
    );
  
  }
}

export default withStyles(styles)(RootScreen);
