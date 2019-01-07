import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "../epics";

export default [
  thunk,
  promise(),
  createEpicMiddleware(rootEpic),
  __DEV__ && logger
].filter(a => a);
