import { alertConstants } from './constants';

const initialState = {
  type: '',
  message: '',
};

const alert = (state = initialState, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'info',
        message: action.message,
      };
    case alertConstants.ERROR:
      return {
        type: 'error',
        message: action.message,
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
};

export default alert;
