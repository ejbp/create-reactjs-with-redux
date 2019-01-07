import get from "lodash.get";

const FETCH_USER = "FETCH_USER";

const fetchUser = () => (dispatch, getState) => {
  const state = getState();
  const token = get(state, "user.profile.token") //for example purposes

  return dispatch({
    type: FETCH_USER,
    payload: fetch('https://randomuser.me/api/')
  });

};
fetchUser.action = FETCH_USER;

export default fetchUser;
