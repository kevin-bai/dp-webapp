import url from '../../utils/url'
import { FETCH_DATA } from '../middlewares/api'
import {schema} from './entities/products'
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

export const actions = {
  loadLikes: () => {
    return (dispatch, getState) => {
      const targetUrl = url.getProductList(0, 10)
      return dispatch(fetchLikes(targetUrl))
      // dispatch(fetchLikesRequest())
      // return get(url.getProductList(0, 10)).then(
      //   data => {
      //     dispatch(fetchLikesSuccess(data))
      //   },
      //   err => {
      //     dispatch(fetchLikesFailure(err))
      //   }
      // )
    }
  },
  loadDiscounts: ()=>{
    return (dispatch, getState) =>{
      const {ids} = getState().home.discounts
      if(ids.length > 0) {
        return null;
      }
      let url ='/mock/products/discounts.json'
      return dispatch(fetchDiscounts(url))
    }
  }
}


const fetchDiscounts = url =>({
  [FETCH_DATA]: {
    types:[
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
    types:[
      types.FETCH_LIKES_REQUEST,
      types.FETCH_LIKES_SUCCESS,
      types.FETCH_LIKES_FAILURE,
    ],
    url,
    schema
  }
})


// const fetchLikesRequest = () => ({
//   type: types.FETCH_LIKES_REQUEST
// })
//
// const fetchLikesSuccess = (data) => ({
//   type: types.FETCH_LIKES_SUCCESS,
//   data
// })
//
// const fetchLikesFailure = (err) => ({
//   type: types.FETCH_LIKES_FAILURE,
//   err
// })

const likes = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
    //todo
    case types.FETCH_LIKES_SUCCESS:
    //todo
    case types.FETCH_LIKES_FAILURE:
    //todo
    default:
  }
  return state
}

const discounts = (state = initialState.discounts, action) =>{
  // console.log('discount reducer', action)
  // console.log('state', state)
  switch (action.type) {
    case types.FETCH_DISCOUNTS_REQUEST:
      return { ...state, isFetching: true };
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
export const getDiscounts = (state) =>{
  return state.home.discounts.ids.map(id =>{
    return state.entities.products[id]
  })
}
