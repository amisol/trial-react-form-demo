const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORM_REQUEST':
      var newState = Object.create(state);
      newState.progress = 'fetching';
      return newState;
    case 'FORM_SUCCESS':
      var newState = Object.create(state);
      newState.progress = 'fetched';
      newState.response = action.response;
      return newState;
    case 'FORM_ERROR':
      var newState = Object.create(state);
      newState.progress = 'error';
      newState.message = action.message;
      return newState;

    default:
      return state;
  }
};

export default reducer;
