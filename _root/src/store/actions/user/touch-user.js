import { createAction } from "redux-actions";

const USER_TOUCH = "USER_TOUCH";
const action = createAction(USER_TOUCH);
const touchUser = () => (dispatch, getState) => {
  return dispatch(
    action()
  );
};
touchUser.action = USER_TOUCH;

export default touchUser;
