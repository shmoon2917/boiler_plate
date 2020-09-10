import { HIDE_ERROR } from "./actions";

const initialState = {
  error: null,
  isOpen: false,
};

const error = (state = initialState, action) => {
  const { error, payload } = action;
  if (error) {
    return {
      error: payload,
      isOpen: true,
    };
  } else if (action.type === HIDE_ERROR) {
    return {
      error: null,
      isOpen: false,
    };
  }

  return state;
};

export default error;
