import url from '../../utils/url'
import { FETCH_DATA } from '../middlewares/api'


export const types = {
  // 获取猜你喜欢请求
  FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST',
  // 获取猜你喜欢请求成功
  FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS',
  // 获取猜你喜欢请求失败
  FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE',
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
  }
}


const fetchLikes = url => ({
  [FETCH_DATA]: {
    types:[
      types.FETCH_LIKES_REQUEST,
      types.FETCH_LIKES_SUCCESS,
      types.FETCH_LIKES_FAILURE,
    ],
    url,

  }
})


const fetchLikesRequest = () => ({
  type: types.FETCH_LIKES_REQUEST
})

const fetchLikesSuccess = (data) => ({
  type: types.FETCH_LIKES_SUCCESS,
  data
})

const fetchLikesFailure = (err) => ({
  type: types.FETCH_LIKES_FAILURE,
  err
})

const reducer = (state = {}, action) => {
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

export default reducer;
