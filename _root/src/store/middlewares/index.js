import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

export default [
  thunk,
  promise(),
  __DEV__ && logger
].filter(a => a);
