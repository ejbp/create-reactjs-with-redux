import { handleActions } from "redux-actions";
import { REHYDRATE } from "redux-persist";
import actions from "../../actions";
import selectors from "./selectors";

export { selectors };

const initialState = {
  profile: undefined,
  lastSeenAt: new Date()
};

export default handleActions(
  {
    [REHYDRATE]: (state, { payload = {}, meta }) => {
      const nextState = payload.user || state;
      return {
        ...nextState,
        lastSeenAt: typeof nextState.lastSeenAt == 'string' ? new Date(nextState.lastSeenAt) : nextState.lastSeenAt
      }
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
