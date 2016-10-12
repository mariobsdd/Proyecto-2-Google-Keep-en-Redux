const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.payload.visibilityFilter;
    default:
      return state;
  }
}

const visibilityFilterItems = (state = 'SHOW_ALL_ITEMS', action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER_ITEMS':
      return action.payload.visibilityFilter;
    default:
      return state;
  }
}

export { visibilityFilter, visibilityFilterItems };