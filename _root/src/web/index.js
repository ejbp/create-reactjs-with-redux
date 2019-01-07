import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import createBrowserHistory from "history/createBrowserHistory";
//Material Theme & Styles
import Theme from "src/theme";
//Redux
import { PersistGate } from "redux-persist/integration/react";
import RouteComponent from "src/navigation";
import configureStore from "src/store";

//create history for navigation
const history = createBrowserHistory({
  basename: __webpack_public_path__.replace("file://", "") //for certain cases (e.g. cordova)
}); 

history.listen(function(location) {
  ////Google Analytics
  //window.ga("set", "page", location.pathname + location.search);
  //window.ga("send", "pageview", location.pathname + location.search);
});

// Build the store
const { store, persistor } = configureStore({
  history,
  extraMiddlewares: []
});

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <MuiThemeProvider theme={Theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
              <div className={classes.screen}>
                <RouteComponent/>
              </div>
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </MuiThemeProvider>
    );
  }

}

const styles = {
  screen: {
      width: "100%",
      height: "100%",
      overflow: hidden
  }
}

const rootElement = document.querySelector("#root");
const AppWithStyles = withStyles(styles)(App);
ReactDOM.render( <AppWithStyles />, rootElement);

