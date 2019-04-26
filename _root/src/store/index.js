import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { connectRouter, routerMiddleware } from "connected-react-router";
import middlewares, { epicMiddleware } from './middlewares';
import epicsRoot from "./epics";
import reducers from "./reducers";
import actions from "./actions";
import migrations from "./migrations";

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["router", "ui"],
  version: 1,
  migrate: createMigrate(migrations, { debug: __DEV__ })
};

export default ({ history, extraReducers = {}, extraMiddlewares = [] }) => {
  const rootReducer = {
    ...reducers,
    ...extraReducers
  };

  const createRootReducer = history =>
    persistCombineReducers(persistConfig, {
      router: connectRouter(history),
      ...rootReducer
    });

  const store = createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(
        ...middlewares,
        routerMiddleware(history), // Build the middleware for intercepting and dispatching navigation actions
        ...extraMiddlewares
      )
    )
  );

  const persistor = persistStore(store);

  epicMiddleware.run(epicsRoot);

  return { store, persistor };
};

export { actions };
