import PropTypes from "prop-types";
import { connect } from "react-redux";
import { actions } from "src/store";
import RootScreen from "./component";

RootScreen.propTypes = {
  lastSeenAt: PropTypes.instanceOf(Date).isRequired
};

const mapStateToProps = (state, props) => {
  return {
    lastSeenAt: state.user.lastSeenAt
  };
};

const mapActionToProps = dispatch => {
  return {
    touch: () => {
      dispatch(actions.user.touchUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(RootScreen);
