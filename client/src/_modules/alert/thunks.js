import { alertActions } from "./actions";

export const alertThunk = (message, type) => (dispatch) => {
  dispatch(alertActions[type](message));

  setTimeout(() => {
    dispatch(alertActions.clear());
  }, 3000);
};
