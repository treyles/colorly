import { databaseRef } from '../utils/base';
import { FETCH_LIBRARY } from './types';

export const fetchLibrary = uid => dispatch => {
  databaseRef
    .child(uid)
    .orderByChild('order')
    .on('value', snapshot => {
      const libraryArray = [];
      snapshot.forEach(item => {
        libraryArray.push(item.val());
      });

      dispatch({
        type: FETCH_LIBRARY,
        library: libraryArray.reverse(),
        loading: false
      });
    });
};
