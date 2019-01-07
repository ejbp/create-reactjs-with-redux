import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from "./epics";
import middlewares from "./middlewares";
import reducers from "./reducers";
import actions from "./actions";
import migrations from "./migrations";

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["router"],
  version: 1,
  migrate: createMigrate(migrations, { debug: true })
};

const epicMiddleware = createEpicMiddleware();

export default ({ history, extraReducers = {}, extraMiddlewares = [] }) => {
  const rootReducer = {
    ...reducers,
    router: connectRouter(history),
    ...extraReducers
  };

  const historyMiddleware = routerMiddleware(history); // Build the middleware for intercepting and dispatching navigation actions
  const persistCombinedReducers = persistCombineReducers(persistConfig, rootReducer);

  const store = createStore(
    connectRouter(history)(persistCombinedReducers),
    composeEnhancers(applyMiddleware(...middlewares, epicMiddleware, historyMiddleware, ...extraMiddlewares))
  );

  const persistor = persistStore(store);
  epicMiddleware.run(rootEpic);

  return { store, persistor };
};

export { actions };
