import uuidv4 from 'uuid';

const initialState = {
  checked: 'color1',
  card: {
    palette: {},
    title: ''
  }
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'MAKE_PALETTE':
      return {
        ...state,
        card: {
          ...state.card,
          palette: action.palette,
          id: uuidv4()
        }
      };
    case 'RESET_BUILD':
      return {
        ...state,
        card: { ...initialState.card }
      };
    case 'CLEAR_PALETTE':
      return {
        ...state,
        card: {
          ...state.card,
          palette: {},
          title: ''
        }
      };
    case 'SET_CHECKED_COLOR':
      return {
        ...state,
        checked: action.checked
      };
    case 'SET_PALETTE_TITLE':
      return {
        ...state,
        card: {
          ...state.card,
          title: action.title
        }
      };
    default:
      return state;
  }
}
