import { databaseRef, storageRef } from '../utils/base';
import {
  SET_PRELOADER,
  SET_IMAGE_SOURCE,
  ADD_COLOR,
  RESET_BUILD,
  CLEAR_PALETTE,
  SET_CHECKED_COLOR,
  SET_PALETTE_TITLE
} from './types';

export const addCardToLibrary = history => (dispatch, getState) => {
  const { uid } = getState().user.currentUser;
  const { card, imageSource } = getState().build;
  const upload = storageRef
    .child(uid)
    .child(card.id)
    .put(imageSource);

  dispatch({
    type: SET_PRELOADER,
    showPreloader: true
  });

  upload.then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
    // add to database
    databaseRef.child(uid).update({
      [card.id]: { ...card, url }
    });

    // navigate home
    history.push('/');
  });
};

export const setImageSource = source => dispatch => {
  dispatch({
    type: SET_IMAGE_SOURCE,
    imageSource: source
  });
};

export const addColorToPalette = color => (dispatch, getState) => {
  const { card: { palette }, checked } = getState().build;
  const newColor = { [checked]: color };

  dispatch({
    type: ADD_COLOR,
    palette: { ...palette, ...newColor }
  });
};

// TODO: resetBuild and clearPalette do almost the same thing
export const resetBuild = () => dispatch => {
  dispatch({
    type: RESET_BUILD
  });
};

export const clearPalette = () => dispatch => {
  dispatch({
    type: CLEAR_PALETTE
  });
};

export const setCheckedColor = e => dispatch => {
  dispatch({
    type: SET_CHECKED_COLOR,
    checked: e.target.id
  });
};

export const setPaletteTitle = e => dispatch => {
  dispatch({
    type: SET_PALETTE_TITLE,
    title: e.target.value
  });
};
