import React from "react";
import { Route } from "react-router";

const RouteWithProps = ({ component: Component, path, exact, ...rest }) => {
  return <Route exact={exact} path={path} render={props => <Component {...props} {...rest} />} />;
};

export default RouteWithProps;
