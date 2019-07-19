import {post} from '../../utils/request'

const types = {
  SET_USER_NAME:'LOGIN/SET_USER_NAME',
  SET_PASSWORD:'LOGIN/SET_PASSWORD',
  FETCH_LOGIN_REQUEST: 'LOGIN/FETCH_LOGIN_REQUEST',
  FETCH_LOGIN_SUCCESS: 'LOGIN/FETCH_LOGIN_SUCCESS',
  FETCH_LOGIN_FAILURE: 'LOGIN/FETCH_LOGIN_FAILURE',
  LOGIN_OUT:'LOGIN/LOGIN_OUT'
}

const initialState = {
  username: '',
  password: '',
  isLogin: false
}

export const actions = {
  login:(userName, password)=>{
    return (dispatch, getState) =>{
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
      setTimeout(()=>{
        dispatch(loginSuccess())
      },500)
    }
  },
  loginOut:()=>({
    type:types.LOGIN_OUT
  }),
  setUsername: (username) => ({
    type:types.SET_USER_NAME,
    username
  }),
  setPassword: (password) => ({
    type: types.SET_PASSWORD,
    password
  })
}

const loginRequest =()=> ({
  type: types.FETCH_LOGIN_REQUEST,
})

const loginSuccess = ()=>({
  type:types.FETCH_LOGIN_SUCCESS
})

const loginFailure = (error)=>({
  type:types.FETCH_LOGIN_FAILURE,
  error
})



const reducer = (state = initialState, action)=>{
  switch (action.type) {

  }
}

export default reducer
