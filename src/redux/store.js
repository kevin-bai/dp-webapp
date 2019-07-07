import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import api from './middlewares/api'
import rootReducer from './modules'

let store;

if (process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENTIONS__) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk,api)
  ))
} else {
  store = createStore(rootReducer, applyMiddleware(thunk,api));
}

export default store;
