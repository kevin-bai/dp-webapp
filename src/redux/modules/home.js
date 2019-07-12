import url from '../../utils/url'
import { FETCH_DATA } from '../middlewares/api'
import { schema } from './entities/products'
import { combineReducers } from "redux";

const initialState = {
  likes: {
    isFetching: false,
    pageCount: 0,
    ids: []
  },
  discounts: {
    isFetching: false,
    ids: []
  }
};

export const types = {
  // 获取猜你喜欢请求
  FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST',
  // 获取猜你喜欢请求成功
  FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS',
  // 获取猜你喜欢请求失败
  FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE',
  FETCH_DISCOUNTS_REQUEST: 'HOME/FETCH_DISCOUNTS_REQUEST',
  FETCH_DISCOUNTS_SUCCESS: 'HOME/FETCH_DISCOUNTS_SUCCESS',
  FETCH_DISCOUNTS_FAILURE: 'HOME/FETCH_DISCOUNTS_FAILURE',
}

// action creator
export const actions = {
  loadLikes: () => {
    return (dispatch, getState) => {
      const {pageCount} = getState().home.likes
      const targetUrl = url.getProductList(pageCount, 10)
      return dispatch(fetchLikes(targetUrl))
    }
  },
  loadDiscounts: () => {
    return (dispatch, getState) => {
      // 利用redux做缓存，判断discounts中已经有ids的时候，就不去做请求dispatch
      const {ids} = getState().home.discounts
      if (ids.length > 0) {
        return null;
      }

      let url = '/mock/products/discounts.json'
      return dispatch(fetchDiscounts(url))
    }
  }
}


const fetchDiscounts = url => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_DISCOUNTS_REQUEST,
      types.FETCH_DISCOUNTS_SUCCESS,
      types.FETCH_DISCOUNTS_FAILURE,
    ],
    url,
    schema
  }
})

const fetchLikes = url => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_LIKES_REQUEST,
      types.FETCH_LIKES_SUCCESS,
      types.FETCH_LIKES_FAILURE,
    ],
    url,
    schema
  }
})

// likes reducer
const likes = (state = initialState.likes, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      return {...state, isFetching: true}
    case types.FETCH_LIKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        ids: state.ids.concat(action.response.ids)
      }
    case types.FETCH_LIKES_FAILURE:
      return {...state, isFetching: false}
    default:
      return state
  }
}

// discounts reducer
const discounts = (state = initialState.discounts, action) => {
  // console.log('discount reducer', action)
  // console.log('state', state)
  switch (action.type) {
    case types.FETCH_DISCOUNTS_REQUEST:
      return {...state, isFetching: true};
    case types.FETCH_DISCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_DISCOUNTS_FAILURE:
      return {...state, isFetching: false}
    default:
      return state;
  }
}

const reducer = combineReducers({
  discounts,
  likes
})

export default reducer;

//selector
export const getDiscounts = (state) => {
  return state.home.discounts.ids.map(id => {
    return state.entities.products[id]
  })
}

export const getLikes = (state) => {
  return state.home.likes.ids.map(id => {
    return state.entities.products[id]
  })
}

export const getLikesPageCount = (state) => {
  return state.home.likes.pageCount
}

export const getLikesFetchingFlag = (state) => {
  return state.home.likes.isFetching
}
