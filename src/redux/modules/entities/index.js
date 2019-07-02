import {combineReducers} from 'redux'
import products from './products'
import shops from './shops'
import comments from './comments'
import orders from './orders'

// 合并领域状态
const rootReducer = combineReducers({
  products,
  shops,
  comments,
  orders
})

export default rootReducer;
