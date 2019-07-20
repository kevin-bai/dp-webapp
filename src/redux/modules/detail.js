import url from "../../utils/url";
import { FETCH_DATA } from "../middlewares/api";
import { schema as productSchema } from "./entities/products";
import { schema as shopSchema } from "./entities/shops";
import { combineReducers } from "redux";

const initialState = {
  product: {
    isFetching: false,
    id: null
  },
  shop: {
    isFetching: false,
    id: null
  }
};

export const types = {
  FETCH_PRODUCT_DETAIL_REQUEST: "DETAIL/FETCH_PRODUCT_DETAIL_REQUEST",
  FETCH_PRODUCT_DETAIL_SUCCESS: "DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS",
  FETCH_PRODUCT_DETAIL_FAILURE: "DETAIL/FETCH_PRODUCT_DETAIL_FAILURE",
  FETCH_SHOP_DETAIL_REQUEST: "DETAIL/FETCH_SHOP_DETAIL_REQUEST",
  FETCH_SHOP_DETAIL_SUCCESS: "DETAIL/FETCH_SHOP_DETAIL_SUCCESS",
  FETCH_SHOP_DETAIL_FAILURE: "DETAIL/FETCH_SHOP_DETAIL_FAILURE"
};

export const actions = {
  loadProductDetail: id => {
    return (dispatch, getState) => {
      const product = getProduct(getState(), id);
      if (product) {
        return dispatch({
          type: types.FETCH_PRODUCT_DETAIL_SUCCESS,
          id
        });
      } else {
        const targetUrl = url.getProductDetail(id);
        return dispatch(fetchProductDetail(targetUrl, id));
      }
    };
  },
  loadShopDetail: id => {
    return (dispatch, getState) => {
      const shop = getShopById(getState(), id);
      if (shop) {
        dispatch({
          type: types.FETCH_SHOP_DETAIL_SUCCESS,
          id
        });
      } else {
        const targetUrl = url.getShopDetail(id);
        return dispatch(fetchShopDetail(targetUrl, id));
      }
    };
  }
};

const fetchProductDetail = (url, id) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_PRODUCT_DETAIL_REQUEST,
      types.FETCH_PRODUCT_DETAIL_SUCCESS,
      types.FETCH_PRODUCT_DETAIL_FAILURE
    ],
    url,
    schema: productSchema
  },
  id
});

const fetchShopDetail = (url, id) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_SHOP_DETAIL_REQUEST,
      types.FETCH_SHOP_DETAIL_SUCCESS,
      types.FETCH_SHOP_DETAIL_FAILURE
    ],
    url,
    schema: shopSchema
  },
  id
});

//reducer
const productDetail = (state = initialState.product, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_DETAIL_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: action.id
      };
    case types.FETCH_PRODUCT_DETAIL_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

const shopDetail = (state = initialState.product, action) => {
  switch (action.type) {
    case types.FETCH_SHOP_DETAIL_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_SHOP_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: action.id
      };
    case types.FETCH_SHOP_DETAIL_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

const reducer = combineReducers({
  productDetail,
  shopDetail
});

export default reducer;

// selectors
export const getProduct = (state, id) => {
  if (state.entities.products) {
    const product = state.entities.products[id];
    return product && product.detail && product.purchaseNotes ? product : null;
  }
};

export const getRelatedShop = (state, productId) => {
  if (state.entities.products[productId]) {
    const shopId = state.entities.products[productId].nearestShop;
    return state.entities.shops[shopId];
  }
};

export const getShopById = (state, id) => {
  return state.entities.shops[id];
};
