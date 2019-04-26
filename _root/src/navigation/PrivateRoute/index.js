import PropTypes from "prop-types";
import { connect } from "react-redux";
import PrivateRouteComponent from "./component";

PrivateRouteComponent.propTypes = {
  component: PropTypes.any.isRequired
};

const mapStateToProps = ({user}, props) => {
  return {
    isAuthenticated: user.profile && !!user.profile.token,
    //someVariable: state.[somevariable]
  };
};

export default connect(
  mapStateToProps,
  undefined,
  undefined,
  {
    pure: false
  }
)(PrivateRouteComponent);
