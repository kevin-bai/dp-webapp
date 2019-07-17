import url from '../../utils/url'
import { combineReducers } from "redux/es/redux";
import { getKeywordById, schema as keywordsSchema } from './entities/keywords';
import { FETCH_DATA } from "../middlewares/api";

const types = {
  // 获取热门关键词
  FETCH_POPULAR_KEYWORDS_REQUEST: 'SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST',
  FETCH_POPULAR_KEYWORDS_SUCCESS: 'SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS',
  FETCH_POPULAR_KEYWORDS_FAILURE: 'SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE',
  // 根据关键词获取关联关键词
  FETCH_RELATED_KEYWORDS_REQUEST: 'SEARCH/FETCH_RELATED_KEYWORDS_REQUEST',
  FETCH_RELATED_KEYWORDS_SUCCESS: 'SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS',
  FETCH_RELATED_KEYWORDS_FAILURE: 'SEARCH/FETCH_RELATED_KEYWORDS_FAILURE',
  // 设置搜索输入
  SET_INPUT_TEXT: 'SEARCH/SET_INPUT_TEXT',
  CLEAR_INPUT_TEXT: 'SEARCH/CLEAR_INPUT_TEXT',
  // 历史关键词
  ADD_HISTORY_KEYWORDS: 'SEARCH/ADD_HISTORY_KEYWORDS',
  CLEAR_HISTORY_KEYWORDS: 'SEARCH/CLEAR_HISTORY_KEYWORDS'
}

const initialState = {
  inputText: '',
  popularKeywords: {
    isFetching: false,
    ids: []
  },
  /**
   * 'huoguo':{
   *     isFetching: false,
   *     ids:[]
   * }
   */
  relatedKeywords: {},
  historyKeywords: []
}


// action creator
export const actions = {
  loadPopularKeywords: () => {
    return (dispatch, getState) => {
      const {ids} = getState().search.popularKeywords
      if (ids.length > 0) {
        return null
      }

      const targetUrl = url.getKeywordsByType('popular')
      return dispatch(fetchPopularKeywords(targetUrl))
    }
  },
  /**
   * 根据keyword 加载相关关键词
   */
  loadRelatedKeywords: (keyword) => {
    return (dispatch, getState) => {
      const data = getState().search.relatedKeywords[keyword]
      if (data) {
        return null
      }

      const targetUrl = url.getKeywordsByType('related')
      return dispatch(fetchRelatedKeywords(targetUrl, keyword))
    }
  },
  setInputText: (text) => ({
    type: types.SET_INPUT_TEXT,
    text
  }),
  clearInputText: () => ({
    type: types.CLEAR_INPUT_TEXT,
  }),
  addHistoryKeywords: text => ({
    type: types.ADD_HISTORY_KEYWORDS,
    text
  }),
  clearHistoryKeywords: () => ({
    type: types.CLEAR_HISTORY_KEYWORDS
  })

}

const fetchPopularKeywords = url => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_POPULAR_KEYWORDS_REQUEST,
      types.FETCH_POPULAR_KEYWORDS_SUCCESS,
      types.FETCH_POPULAR_KEYWORDS_FAILURE,
    ],
    url,
    schema: keywordsSchema
  }
})

const fetchRelatedKeywords = (url, text) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_RELATED_KEYWORDS_REQUEST,
      types.FETCH_RELATED_KEYWORDS_SUCCESS,
      types.FETCH_RELATED_KEYWORDS_FAILURE,
    ],
    url,
    schema: keywordsSchema
  },
  text
})


const popularKeywords = (state = initialState.popularKeywords, action) => {
  // console.log('popularKeywords-----action',action)
  switch (action.type) {
    case types.FETCH_POPULAR_KEYWORDS_REQUEST:
      return {...state, isFetching: true}
    case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: action.response.ids
      }
    case types.FETCH_POPULAR_KEYWORDS_FAILURE:
      return {...state, isFetching: false}
    default:
      return state
  }
}


const relatedKeywords = (state = initialState.relatedKeywords, action) => {

  // console.log('relatedKeywords-----state',state)
  // console.log('relatedKeywords-----action',action)
  // console.log('relatedKeywords-----action2',state[action.text])

  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return {
        ...state,
        [action.text]: relatedKeywordsByText(state[action.text], action)
      }
    default:
      return state
  }
}


const relatedKeywordsByText = (
  state = {isFetching: false, ids: []},
  action
) => {
  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
      return {...state, isFetching: true}
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
      return {...state, isFetching: false, ids: state.ids.concat(action.response.ids)}
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return {...state, isFetching: false}
    default:
      return state
  }
}


const inputText = (state = initialState.inputText, action) => {
  switch (action.type) {
    case types.SET_INPUT_TEXT:
      return action.text
    case types.CLEAR_INPUT_TEXT:
      return ''
    default:
      return state
  }
}

const historyKeywords = (state = initialState.historyKeywords, action) => {
  switch (action.type) {
    case types.ADD_HISTORY_KEYWORDS:
      const data = state.filter(item => action.text !== item)

      return [...data, action.text]
    case types.CLEAR_HISTORY_KEYWORDS:
      return []
    default:
      return state
  }
}

const reducer = combineReducers({
  popularKeywords,
  relatedKeywords,
  inputText,
  historyKeywords
})

export default reducer

//selectors
export const getPopularKeywords = (state) => {
  // console.log('getPopularKeywords---:',state)

  return state.search.popularKeywords.ids.map(id => {
    return getKeywordById(state, id)
  })
}

export const getRelatedKeywords = (state) => {

  // debugger
  const inputText = state.search.inputText
  if(!inputText || inputText.trim().length ===0){
    return null
  }
  const relatedKeyword = state.search.relatedKeywords[inputText]

  if (!relatedKeyword){
    return null
  }
  return relatedKeyword.ids.map(id =>{
    return getKeywordById(state, id)
  })
}

export const getInputText = state => {
  return state.search.inputText
}

export const getHistoryKeywords = state => {
  return state.search.historyKeywords.map( id =>{
    return getKeywordById(state, id)
  })
}
