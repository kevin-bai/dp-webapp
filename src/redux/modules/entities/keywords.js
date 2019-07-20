export const schema = {
  name: "keywords",
  id: "id"
};

const reducer = (state = {}, action) => {
  if (action.response && action.response.keywords) {
    console.log("state----entities---keywords", {
      ...state,
      ...action.response.keywords
    });
    return { ...state, ...action.response.keywords };
  }
  return state;
};

export default reducer;

// selector
export const getKeywordById = (state, id) => {
  return state.entities.keywords[id];
};
