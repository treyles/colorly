const initialState = {
  currentUser: false,
  isNewUser: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    case 'SIGN_IN':
      return {
        ...state,
        isNewUser: action.payload
      };
    case 'CLOSE_NEW_USER':
      return {
        ...state,
        isNewUser: false
      };
    default:
      return state;
  }
}
