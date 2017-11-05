export default (state = {
  order : {
    selection : 'time',
    options   : 'n2f'
  },
  group : {
  },
  selectedTag : []
}, action) => {
  const newState = Object.assign({}, state);
  const { type } = action;

  switch (type) {
  default:
    return newState;
  }
};
