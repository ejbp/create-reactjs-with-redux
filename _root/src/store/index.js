import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { connectRouter, routerMiddleware } from "connected-react-router";

import middlewares from "./middlewares";
import reducers from "./reducers";
import actions from "./actions";
import migrations from "./migrations";

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["router"],
  version: 0,
  migrate: createMigrate(migrations, { debug: true })
};

export default ({ history, extraReducers = {}, extraMiddlewares = [] }) => {
  const rootReducer = {
    ...reducers,
    ...extraReducers
  };

  const historyMiddleware = routerMiddleware(history); // Build the middleware for intercepting and dispatching navigation actions
  const persistCombinedReducers = persistCombineReducers(persistConfig, rootReducer);

  const store = createStore(
    connectRouter(history)(persistCombinedReducers),
    composeEnhancers(applyMiddleware(...middlewares, historyMiddleware, ...extraMiddlewares))
  );

  const persistor = persistStore(store);

  return { store, persistor };
};

export { actions };
