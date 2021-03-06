import url from "../../utils/url";
import { FETCH_DATA } from "../middlewares/api";
import { combineReducers } from "redux";
import {
  schema as orderSchema,
  getOrderById,
  USED_TYPE,
  AVAILABLE_TYPE,
  REFUND_TYPE,
  TO_PAY_TYPE,
  actions as orderActions
} from "./entities/orders";

const initialState = {
  orders: {
    isFetching: false,
    ids: [],
    toPayIds: [], //待付款订单id
    availableIds: [], // 可使用订单id
    refundIds: [] // 退款订单id
  },
  currentTab: 0,
  currentOrder: {
    id: null,
    isDeleting: false,
    isCommenting:false,
    comment:'',
    stars: 0
  }
};

export const types = {
  // 获取订单列表
  FETCH_ORDERS_REQUEST: "USER/FETCH_ORDERS_REQUEST",
  FETCH_ORDERS_SUCCESS: "USER/FETCH_ORDERS_SUCCESS",
  FETCH_ORDERS_FAILURE: "USER/FETCH_ORDERS_FAILURE",
  // 设置当前tab
  SET_CURRENT_TAB: "USER/SET_CURRENT_TAB",
  //删除订单
  DELETE_ORDER_REQUEST: "USER/DELETE_ORDER_REQUEST",
  DELETE_ORDER_SUCCESS: "USER/DELETE_ORDER_SUCCESS",
  DELETE_ORDER_FAILURE: "USER/DELETE_ORDER_FAILURE",
  //删除确认对话框
  SHOW_DELETE_DIALOG: "USER/SHOW_DELETE_DIALOG",
  HIDE_DELETE_DIALOG: "USER/HIDE_DELETE_DIALOG",
  SET_CURRENT_ORDER:'USER/SET_CURRENT_ORDER',
  SHOW_COMMENT_AREA:'USER/SHOW_COMMENT_AREA',
  HIDE_COMMENT_AREA:'USER/HIDE_COMMENT_AREA',
  SET_CURRENT_COMMENT: 'USER/SET_CURRENT_COMMENT',
  SET_CURRENT_STAR:'USER/SET_CURRENT_STAR'
};

export const actions = {
  loadOrders: () => {
    return (dispatch, getState) => {
      const { ids } = getState().user.orders;
      if (ids.length > 0) {
        return null;
      }

      const targetUrl = url.getOrders();
      return dispatch(fetchOrders(targetUrl));
    };
  },
  setCurrentTab: index => ({
    type: types.SET_CURRENT_TAB,
    index
  }),
  hideDeleteDialog: ()=>({
    type:types.HIDE_DELETE_DIALOG
  }),
  removeOrder : ()=>{
    return (dispatch, getState) =>{
      const orderId = getState().user.currentOrder.id

      dispatch({
        type: types.DELETE_ORDER_REQUEST
      })

      return new Promise((resolve, reject) => {
        setTimeout( ()=>{
          dispatch({
            type:types.DELETE_ORDER_SUCCESS,
            orderId
          })

          dispatch(orderActions.deleteOrder(orderId))
          resolve()
        },500)
      })

    }
  },
  showDeleteDialog: orderId =>({
    type:types.SHOW_DELETE_DIALOG,
    orderId
  }),
  commentingOrder: orderId =>{
    return (dispatch, getState) =>{
      dispatch(setCurrentOrder(orderId))
      dispatch({
        type:types.SHOW_COMMENT_AREA
      })
    }
  },
  setComment: text =>({
    type: types.SET_CURRENT_COMMENT,
    text
  }),
  setCurrentStar: stars =>({
    type: types.SET_CURRENT_STAR,
    stars
  })
}
;

const setCurrentOrder = orderId =>({
  type: types.SET_CURRENT_ORDER,
  orderId
})


const removeOrderId = (state, key, orderId) => {
  return state[key].filter(id => {
    return id !== orderId;
  });
};

const fetchOrders = url => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_ORDERS_REQUEST,
      types.FETCH_ORDERS_SUCCESS,
      types.FETCH_ORDERS_FAILURE
    ],
    schema: orderSchema,
    url
  }
});



//reducer

const orders = (state = initialState.orders, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_ORDERS_SUCCESS:
      const toPayIds = action.response.ids.filter(id => {
        return action.response.orders[id].type === TO_PAY_TYPE;
      });
      const availableIds = action.response.ids.filter(
        id => action.response.orders[id].type === AVAILABLE_TYPE
      );
      const refundIds = action.response.ids.filter(
        id => action.response.orders[id].type === REFUND_TYPE
      );
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids),
        toPayIds: state.toPayIds.concat(toPayIds),
        availableIds: state.availableIds.concat(availableIds),
        refundIds: state.refundIds.concat(refundIds)
      };
    case types.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        ids: removeOrderId(state, "ids", action.orderId),
        toPayIds: removeOrderId(state, "toPayIds", action.orderId),
        availableIds: removeOrderId(state, "availableIds", action.orderId),
        refundIds: removeOrderId(state, "refundIds", action.orderId)
      };
    case types.FETCH_ORDERS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

const currentTab = (state = initialState.currentTab, action) => {
  switch (action.type) {
    case types.SET_CURRENT_TAB:
      return action.index;
    default:
      return state;
  }
};

const currentOrder =(state = initialState.currentOrder, action) =>{
  switch (action.type) {
    case types.SHOW_DELETE_DIALOG:
      return {
        ...state,
        isDeleting: true,
        id: action.orderId
      }
    case types.HIDE_DELETE_DIALOG:
      return {...state, isDeleting: false, id: null}
    case types.DELETE_ORDER_SUCCESS:
    case types.DELETE_ORDER_FAILURE:
      return initialState.currentOrder
    case types.SET_CURRENT_ORDER:
      const comment = action.orderId === state.id ? state.comment: ''
      const stars = action.orderId === state.id ? state.stars: 0
      return {...state, id: action.orderId ,comment,stars}
    case types.SHOW_COMMENT_AREA:
      return {...state, isCommenting: true}
    case types.SET_CURRENT_COMMENT:
      return {...state, comment: action.text}
    case types.SET_CURRENT_STAR:
      return {...state, stars: action.stars}
    default:
      return state
  }

}

const reducer = combineReducers({
  orders,
  currentTab,
  currentOrder
});

export default reducer;

//selectors

export const getCurrentTab = state => {
  return state.user.currentTab;
};

export const getOrders = state => {
  const key = ["ids", "toPayIds", "availableIds", "refundIds"][state.user.currentTab];
  return state.user.orders[key].map(id => {
    return getOrderById(state, id)
  })
};

export const getDeletingOrderId = state =>{
  return state.user.currentOrder.isDeleting ? state.user.currentOrder.id : null
}

export const getCurrentOrderStar = state =>{
  return state.user.currentOrder.stars
}

export const getCurrentOrderComment = state =>{
  return state.user.currentOrder.comment
}

export const getCurrentOrder = state =>{
  return state.user.currentOrder
}
