const setsearch = (state = {search: ""}, action) => {
  switch (action.type){
    case 'SEARCH_ITEM':
      state.search = action.payload.text.toUpperCase();
      return state;
    default:
      return state;
    
  }
}

export { setsearch };