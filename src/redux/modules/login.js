
const types = {
  SET_USER_NAME:'LOGIN/SET_USER_NAME',
  SET_PASSWORD:'LOGIN/SET_PASSWORD',
  FETCH_LOGIN_REQUEST: 'LOGIN/FETCH_LOGIN_REQUEST',
  FETCH_LOGIN_SUCCESS: 'LOGIN/FETCH_LOGIN_SUCCESS',
  FETCH_LOGIN_FAILURE: 'LOGIN/FETCH_LOGIN_FAILURE',
}

const initialState = {
  username: '',
  password: '',
  isLogin: false
}

export const actions = {
  setUsername: (username) => ({
    type:types.SET_USER_NAME,
    username
  }),
  setPassword: (password) => ({
    type: types.SET_PASSWORD,
    password
  })
}

const reducer = (state = initialState, action)=>{
  switch (action.type) {

  }
}

export default reducer
