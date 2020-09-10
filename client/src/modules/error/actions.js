export const SET_ERROR = "SET_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";

export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
    error: true,
  };
};

export const hideError = () => {
  return {
    type: HIDE_ERROR,
  };
};
