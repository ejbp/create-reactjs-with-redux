import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import { createEpicMiddleware } from 'redux-observable';

export const epicMiddleware = createEpicMiddleware();

export default [
  thunk, 
  promise, 
  epicMiddleware, 
  __DEV__ && logger
].filter(
  a => a
);
