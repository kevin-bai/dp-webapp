const initialState = {
  error: null
}

export const types = {
  CLEAR_ERROR: 'APP/CLEAR_ERROR'
}

// action creators
export const actions = {
  clearError: () => ({
    type: types.CLEAR_ERROR
  })
}

const reducer = (state = initialState, action) => {
  const {error, type} = action
  if (type === types.CLEAR_ERROR) {
    return {...state, error: null}
  } else if (error) {
    return {...state, error: error}
  }
  return state
}

export default reducer;


// selectors 用于在state中获取某一部分状态的'
// ui层和redux层，都是通过selector层通信的，使得他们这2层解耦
export const getError = (state) =>{
  return state.app.error
}
