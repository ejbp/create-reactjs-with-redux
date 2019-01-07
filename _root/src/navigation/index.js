import React from "react";
import PrivateRoute from "./PrivateRoute";
import RouteWithProps from "./RouteWithProps";
import { Redirect } from "react-router";
import { Switch } from "react-router"; // react-router v4
//Screens
import RootScreen from "src/web/screens/RootScreen";

const routes = props => {
  return (
    <Switch>
      <RouteWithProps key="route-1" path="/" component={RootScreen} {...props} />      
    </Switch>
  );
};

export default withDevice(routes);

/*
  <PrivateRoute key="route-x" exact path="/" component={Redirect} to="/index.html" {...props} />
  <PrivateRoute key="route-x" exact path="/index.html" component={RootScreen} {...props} />
  
  <PrivateRoute
    key="route-x"
    path="/playlists/search"
    notValidPath="/signin"
    component={PlaylistsSearchScreen}
    //requires={['someVariable']}
    {...props}
  />
*/