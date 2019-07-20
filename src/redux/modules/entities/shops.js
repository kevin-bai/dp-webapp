export const schema = {
  name: "shops",
  id: "id"
};

const reducer = (state = {}, action) => {
  if (action.response && action.response.shops) {
    console.log("entities -- shops--state", {
      ...state,
      ...action.response.shops
    });
    return { ...state, ...action.response.shops };
  }
  return state;
};

export default reducer;

//selector

export const getShopById = (state, id) => {
  return state.entities.shops[id];
};
