import uuidv4 from 'uuid';
import {
  SET_PRELOADER,
  SET_IMAGE_SOURCE,
  ADD_COLOR,
  RESET_BUILD,
  CLEAR_PALETTE,
  SET_CHECKED_COLOR,
  SET_PALETTE_TITLE
} from '../actions/types';

const initialState = {
  checked: 'color1',
  imageSource: false,
  showPreloader: false,
  card: {
    palette: {},
    title: ''
  }
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_IMAGE_SOURCE:
      return {
        ...state,
        imageSource: action.imageSource
      };
    case ADD_COLOR:
      return {
        ...state,
        card: {
          ...state.card,
          palette: action.palette,
          id: uuidv4(),
          order: Date.now()
        }
      };
    case CLEAR_PALETTE:
      return {
        ...state,
        card: {
          ...state.card,
          palette: {},
          title: ''
        }
      };
    case SET_CHECKED_COLOR:
      return {
        ...state,
        checked: action.checked
      };
    case SET_PALETTE_TITLE:
      return {
        ...state,
        card: {
          ...state.card,
          title: action.title
        }
      };
    case SET_PRELOADER:
      return {
        ...state,
        showPreloader: action.showPreloader
      };
    case RESET_BUILD:
      return initialState;
    default:
      return state;
  }
}
