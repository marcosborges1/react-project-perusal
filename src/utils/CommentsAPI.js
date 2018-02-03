const api = process.env.REACT_APP_COMMENTS_API_URL || 'http://localhost:3001'

const headers = {
  'Authorization': 'whatever-you-want'
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const createPost = (body) => { 
	// console.log(JSON.stringify(body))
	return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}

  export const votePost = (id, option) => {

  	console.log(JSON.stringify({option}));
  	return  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
  }).then(res => res.json())
 }