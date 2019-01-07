import { createSelector } from "reselect";

const selectors = {};

selectors.profile = state => state.user.profile;

selectors.isAuthenticated = createSelector(
  state => state.user.profile,
  profile => !!profile
);

export default selectors;
