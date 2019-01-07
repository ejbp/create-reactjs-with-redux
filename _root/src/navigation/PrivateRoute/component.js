import React from "react";
import { Redirect } from "react-router";
import RouteWithProps from "../RouteWithProps";

const checkRequirements = ({requires, props}) => {
  const result = requires.filter((key)=>(key in props)).length;
  return result == requires.length;
};

const PrivateRoute = ({ component: Component, notValidPath, isAuthenticated, requires = [], ...rest }) => {
  const isValid = isAuthenticated && checkRequirements({requires, props: rest});
 
  if (!isValid) {
    return <RouteWithProps {...rest} component={Redirect} to={{ pathname: notValidPath }} />;
  } else {
    return <RouteWithProps {...rest} component={Component} />;
  }
};

export default PrivateRoute;
