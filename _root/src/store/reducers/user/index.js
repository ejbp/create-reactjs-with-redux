import { handleActions, combineActions } from "redux-actions";
import { REHYDRATE } from "redux-persist";
import actions from "../../actions";
import selectors from './selectors';
import traverse from "traverse";
import moment from "moment";

export { selectors };

const initialState = {
  profile: undefined,
  lastSeenAt: 0
  // profile:
};

export default handleActions(
  {
    [REHYDRATE]: (state, { payload={}, meta }) => {
      const nextState = payload.user || state;
      return traverse(nextState).map(
        val => (moment(val, moment.ISO_8601).isValid() ? new Date(val) : val)
      )
    },
    [`${actions.user.fetchUser.action}_FULFILLED`]: (state, { payload, meta }) => ({
      ...state,
      profile: {
        ...payload.results[0]
      }
    }),
    [`${actions.user.touchUser.action}`]: (state, { payload }) => {
      return {
        ...state,
        lastSeenAt: new Date()
      };
    }
  },
  initialState
);
