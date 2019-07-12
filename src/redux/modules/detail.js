import url from '../../utils/url'
import { FETCH_DATA } from '../middlewares/api'
import { schema } from './entities/products'
import { combineReducers } from "redux";

const intialState = {
  product: {
    isFetching: false,
    id: null
  }
}

export const types = {
  FETCH_PRODUCT_DETAIL_REQUEST: 'DETAIL/FETCH_PRODUCT_DETAIL_REQUEST',
  FETCH_PRODUCT_DETAIL_SUCCESS: 'DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS',
  FETCH_PRODUCT_DETAIL_FAILURE: 'DETAIL/FETCH_PRODUCT_DETAIL_FAILURE'
}

export const actions = {
  loadProductDetail: (id) => {
    console.log('loadProductDetail')
    return (dispatch, getState) => {
      const targetUrl = url.getProductDetail(id)
      return dispatch(getProductDetail(targetUrl, id))
    }
  }
}

const getProductDetail = (url, id) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_PRODUCT_DETAIL_REQUEST,
      types.FETCH_PRODUCT_DETAIL_SUCCESS,
      types.FETCH_PRODUCT_DETAIL_FAILURE
    ],
    url,
    schema
  },
  id
})

//reducer
const productDetail = (state = intialState.product, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_DETAIL_REQUEST:
      return {...state, isFetching: true}
    case types.FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: state.id
      }
    case types.FETCH_PRODUCT_DETAIL_FAILURE:
      return {...state, isFetching: false}
    default:
      return state
  }
}

const reducer = combineReducers({
  productDetail,
})

export default reducer;

// selectors
export const getProduct = (state, id) => {
  return state.entities.product[id]
}
