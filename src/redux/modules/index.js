import {combineReducers} from 'redux'
import home from './home'
import detail from './detail'
import search from './search'
import app from './app'
import entities from './entities'

const rootReducer = combineReducers({
  app,
  entities,
  home,
  detail,
  search
})

export default rootReducer;
