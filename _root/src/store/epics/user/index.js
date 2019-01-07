import { ofType, combineEpics } from "redux-observable";
import { map, filter, ignoreElements } from "rxjs/operators";
import actions from "../../actions";

const touchEvent = (action$, store) =>
  action$.pipe(
    ofType(
      actions.user.touchUser.action
    ),
    map(action => {
      console.log("Action captured on user epic: ", action);
    }),
    ignoreElements()
  );

export default combineEpics(
  touchEvent
);
  
