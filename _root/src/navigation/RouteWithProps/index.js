import PropTypes from "prop-types";
import RouteWithPropsComponent from "./component";

RouteWithPropsComponent.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired
};

export default RouteWithPropsComponent;
