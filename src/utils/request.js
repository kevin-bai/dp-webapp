const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json"
})

function get(url) {
  return fetch(url, {
    method: 'GET',
    headers: headers
  }).then(res => {
    return handleResponse(url, res)
  }).catch(err =>{
    console.error(`request failed. Url=${url}, Message=${err}`)
    return Promise.reject({err: {message: `failed request`}})
  })
}

function post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body:data
  }).then(res => {
    return handleResponse(url, res)
  }).catch(err =>{
    console.error(`request failed. Url=${url}, Message=${err}`)
    return Promise.reject({err: {message: `failed request`}})
  })
}

// todo
// delete update put


function handleResponse(url, res) {
  if (res.status === 200) {
    return res.json()
  } else {
    console.error(`request failed. Url = ${url}`)
    return Promise.reject({error: {message: `failed request due to server error`}})
  }
}


export {get, post}
