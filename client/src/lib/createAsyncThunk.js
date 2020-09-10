const createAsyncThunk = (type, promiseCreator) => {
  const thunk = (...params) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return async (dispatch, _getState, { history }) => {
      dispatch({ type });
      try {
        const payload = await promiseCreator(...params);
        dispatch({ type: SUCCESS, payload });

        return payload;
      } catch (e) {
        console.log("in thunk error");
        dispatch({ type: ERROR, payload: e, error: true });
      }
    };
  };

  return thunk;
};

export default createAsyncThunk;
