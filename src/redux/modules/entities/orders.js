export const schema = {
  name: "orders",
  id: "id"
};

export const USED_TYPE = 1; // 已消费
export const TO_PAY_TYPE = 2; //待付款
export const AVAILABLE_TYPE = 3; //可使用
export const REFUND_TYPE = 4; //退款

export const types = {
  //删除订单
  DELETE_ORDER: "ORDERS/DELETE_ORDER",
  //新增评价
  ADD_COMMENT: "ORDERS/ADD_COMMENT"
}

export const actions = {
  deleteOrder: id=>({
    type:types.DELETE_ORDER,
    id
  })
}

const reducer = (state = {}, action) => {
  console.log("entities -- orders--state", {
    ...state,
    ...action
  });
  if(action.type === types.DELETE_ORDER){
    const {[action.id]: deleteOrder, ...restOrder} = state
    console.log('rest',restOrder)
    return restOrder
  }
  else {
    if (action.response && action.response.orders) {

      return {...state, ...action.response.orders};
    }
    return state;
  }

};

export default reducer;

//selector

export const getOrderById = (state,id) => {
  return state.entities.orders[id] || null
}
