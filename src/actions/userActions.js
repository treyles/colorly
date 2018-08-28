import { auth } from '../utils/base';
import { SIGN_IN, FETCH_USER, CLOSE_NEW_USER } from './types';

export const signIn = provider => dispatch => {
  auth.signInWithPopup(provider).then(result => {
    dispatch({
      type: SIGN_IN,
      isNewUser: result.additionalUserInfo.isNewUser
    });
  });
};

export const fetchUser = currentUser => dispatch => {
  dispatch({
    type: FETCH_USER,
    currentUser
  });
};

export const closeNewUserDialog = () => dispatch => {
  dispatch({
    type: CLOSE_NEW_USER
  });
};
