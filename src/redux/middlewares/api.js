import { get } from '../../utils/request'

export const FETCH_DATA = 'FETCH_DATA'

export default store => next => action => {
  console.log('enter api middleware');

  const callApi = action[FETCH_DATA]

  if (typeof callApi === 'undefined') {
    next(action)
  }

  const {types, url, schema} = callApi;

  if (typeof url !== 'string') {
    throw new Error('invalid url type, must be string')
  }

  if (!Array.isArray(types) && types.length === 3) {
    throw new Error('invalid types type, must be an Array of 3 element')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('type must be string')
  }

  if (!schema) {
    throw new Error('must have a schema')
  }

  const [requestType, successType, failureType] = types


  // 透传 除了FETCH_DATA外的其他action
  const actionWith = data =>{
    const finalAction = {...action, ...data}
    delete finalAction[FETCH_DATA]
    return finalAction
  }

  next(actionWith({type: requestType}))

  //
  // return get(url).then(
  //   res => next({
  //     type: successType,
  //     data: normalizeData(res)
  //   }),
  //   error => next({
  //     type: failureType,
  //     error: error.message || 'request failed'
  //   })
  // ).catch(
  //   error => next({
  //     type: failureType,
  //     error: error.message || 'request failed'
  //   })
  // )

  return fetchData(url).then(
    res => {
      console.log('res',res)
      next(actionWith({
        type: successType,
        data: res
      }))
    },
    error => next(actionWith({
      type: failureType,
      error: error.message || 'request failed'
    }))
  )

  const fetchData = url => {
    return get(url).then(res => {
      return normalizeData(res)
    })
  }


  function normalizeData(data) {
    console.log('normalizeData')
    const {id, name} = schema;

    if (!id) {
      throw new Error('need id in schema')
    }

    if (!name) {
      throw new Error('need name in schema')
    }

    let kvObj = {};
    let ids = []

    if (Array.isArray(data)) {
      data.forEach(item => {
        kvObj[item[id]] = item
        ids.push(item[id])
      })
    } else {
      kvObj[data[id]] = data
      ids.push(data[id])
    }
    return {
      [name]: kvObj,
      ids
    }
  }


}
