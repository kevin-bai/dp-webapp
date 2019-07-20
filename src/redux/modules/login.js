import { post } from '../../utils/request'

const types = {
  SET_USER_NAME: 'LOGIN/SET_USER_NAME',
  SET_PASSWORD: 'LOGIN/SET_PASSWORD',
  FETCH_LOGIN_REQUEST: 'LOGIN/FETCH_LOGIN_REQUEST',
  FETCH_LOGIN_SUCCESS: 'LOGIN/FETCH_LOGIN_SUCCESS',
  FETCH_LOGIN_FAILURE: 'LOGIN/FETCH_LOGIN_FAILURE',
  LOGIN_OUT: 'LOGIN/LOGIN_OUT'
}

const initialState = {
  username: localStorage.getItem('username') || '',
  password: '',
  isFetching: false,
  isLogin:localStorage.getItem('isLogin') ||  false
}

export const actions = {
  login: () => {
    return (dispatch, getState) => {
      const {username, password} = getState().login

      if(!username && !password){
        dispatch(loginFailure('用戶名不能为空'))
      }

      dispatch(loginRequest())

      // post('/mock/login',{
      //   userName,
      //   password
      // }).then(()=>{
      //   dispatch(loginSuccess())
      // }).catch((error)=>{
      //   dispatch(loginFailure(error))
      // })

      // mock login
      return new Promise((resolve,reject) =>{
        setTimeout(() => {
          dispatch(loginSuccess())
          localStorage.setItem('username',username)
          localStorage.setItem('isLogin',true)
          resolve()
        }, 500)
      })

    }
  },
  loginOut: () => {
    localStorage.removeItem('username')
    localStorage.removeItem('isLogin')
    return {
      type: types.LOGIN_OUT
    }
  },
  setUsername: (username) => ({
    type: types.SET_USER_NAME,
    username
  }),
  setPassword: (password) => ({
    type: types.SET_PASSWORD,
    password
  })
}

const loginRequest = () => ({
  type: types.FETCH_LOGIN_REQUEST,
})

const loginSuccess = () => ({
  type: types.FETCH_LOGIN_SUCCESS
})

const loginFailure = (error) => ({
  type: types.FETCH_LOGIN_FAILURE,
  error
})


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LOGIN_REQUEST:
      return {...state, isFetching: true}
    case types.FETCH_LOGIN_SUCCESS:

      return {...state, isLogin: true, isFetching: false}
    case types.FETCH_LOGIN_FAILURE:
      return {...state, isFetching: false, isLogin: false}
    case types.LOGIN_OUT:
      return {...state, isLogin: false, username: ''}
    case types.SET_USER_NAME:
      return {...state, username: action.username}
    case types.SET_PASSWORD:
      return {...state, password: action.password};
    default :
      return state
  }
}

export default reducer

// selectors

export const getUserName = (state)=>{
  return state.login.username
}

export const getPassword = (state)=>{
  return state.login.password
}

export const getLoginStatus = (state)=>{
  return state.login.isLogin
}
