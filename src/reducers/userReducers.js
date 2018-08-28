import { FETCH_USER, SIGN_IN, CLOSE_NEW_USER } from '../actions/types';

const initialState = {
  currentUser: null,
  isNewUser: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        currentUser: action.currentUser
      };
    case SIGN_IN:
      return {
        ...state,
        isNewUser: action.isNewUser
      };
    case CLOSE_NEW_USER:
      return {
        ...state,
        isNewUser: false
      };
    default:
      return state;
  }
}
