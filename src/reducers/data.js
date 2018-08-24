const initialState = {
  library: [],
  loading: true
};
export default function data(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_LIBRARY':
      return {
        ...state,
        library: action.library || [],
        loading: action.loading
      };
    default:
      return state;
  }
}
