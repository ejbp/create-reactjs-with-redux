import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "src/store";
import RootScreen from "./component";

RootScreen.propTypes = {
  lastSeenAt: PropTypes.instanceOf(Date).isRequired
};

const mapStateToProps = (state, props) => {
  const { user, ui } = state;
  return {
    lastSeenAt: user.lastSeenAt,
    user: user.profile,
    uiState: ui
  };
};

const mapActionToProps = dispatch => {
  return {
    touch: () => {
      dispatch(actions.user.touchUser());
    },
    fetchUser: () => {
      dispatch(actions.user.fetchUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(RootScreen);
