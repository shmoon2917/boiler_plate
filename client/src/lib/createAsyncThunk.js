import { alertActions } from '../modules/alert';

const createAsyncThunk = (type, promiseCreator) => {
  const thunk = (body, from) => {
    const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

    return async (dispatch, _getState, { history }) => {
      dispatch({ type });
      try {
        const payload = await promiseCreator(body);
        dispatch({ type: SUCCESS, payload });

        if (from) {
          history.push(`${from}`);
        }
      } catch (e) {
        dispatch({ type: ERROR, payload: e, error: true });
        dispatch(alertActions.error(e));
      }
    };
  };

  return thunk;
};

export default createAsyncThunk;
