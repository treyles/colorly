import { auth, databaseRef, demoRef } from '../utils/base';

export const fetchUser = payload => dispatch => {
  dispatch({
    type: 'SET_CURRENT_USER',
    payload
  });
};

export const signIn = provider => dispatch => {
  auth.signInWithPopup(provider).then(result => {
    dispatch({
      type: 'SIGN_IN',
      payload: result.additionalUserInfo.isNewUser
    });
  });
};

export const fetchLibrary = uid => dispatch => {
  databaseRef.child(uid).on('value', snapshot => {
    const libArray = [];
    snapshot.forEach(item => {
      libArray.push(item.val());
    });

    dispatch({
      type: 'FETCH_LIBRARY',
      library: libArray,
      loading: false
    });
  });
};

export const closeNewUserDialog = () => dispatch => {
  dispatch({
    type: 'CLOSE_NEW_USER'
  });
};

export const fetchDemo = () => dispatch => {
  demoRef.once('value').then(snapshot => {
    dispatch({
      type: 'FETCH_DEMO',
      snapshot
    });
  });

  closeNewUserDialog();
};

// BUILD /////////

export const makePalette = color => (dispatch, getState) => {
  const { card: { palette }, checked } = getState().build;
  const newColor = { [checked]: color };

  dispatch({
    type: 'MAKE_PALETTE',
    palette: { ...palette, ...newColor }
  });
};

export const resetBuild = () => dispatch => {
  dispatch({
    type: 'RESET_BUILD'
  });
};

export const clearPalette = () => dispatch => {
  dispatch({
    type: 'CLEAR_PALETTE'
  });
};

export const setCheckedColor = e => dispatch => {
  dispatch({
    type: 'SET_CHECKED_COLOR',
    checked: e.target.id
  });
};

export const setPaletteTitle = e => dispatch => {
  dispatch({
    type: 'SET_PALETTE_TITLE',
    title: e.target.value
  });
};
