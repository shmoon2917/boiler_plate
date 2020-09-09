const createAsyncThunk = (type, promiseCreator, redirect = null) => {
  const thunk = (...params) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return async (dispatch, getState, { history }) => {
      console.log("history", history);
      dispatch({ type });
      try {
        const payload = await promiseCreator(...params);
        await dispatch({ type: SUCCESS, payload });
        if (redirect) {
          history.push(`${redirect}`);
        }
      } catch (e) {
        console.log("에러", e);
        dispatch({ type: ERROR, payload: e, error: true });
      }
    };
  };

  return thunk;
};

export default createAsyncThunk;
