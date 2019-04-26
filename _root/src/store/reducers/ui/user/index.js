import { handleActions } from "redux-actions";
import actions from "src/store/actions";

const initialState = {
  fetching: false
};

export default handleActions(
  {
    [`${actions.user.fetchUser.action}_PENDING`]: (state, { payload, meta }) => ({
      ...state,
      fetching: true
    }),
    [`${actions.user.fetchUser.action}_REJECTED`]: (state, { payload, meta }) => ({
      ...state,
      fetching: false
    }),
    [`${actions.user.fetchUser.action}_FULFILLED`]: (state, { payload, meta }) => ({
      ...state,
      fetching: false
    })
  },
  initialState
);
