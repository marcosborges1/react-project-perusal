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

export const getCommentsByPost = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => {
    		return res.json()
    	}
    )

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

export const createComment = (body) => { 
	
	return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}

export const votePost = (id, option) => {
	// console.log(JSON.stringify({option}));
	// console.log(`${api}/posts/${id}`);
  	return  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
  }).then(res => res.json())
}

export const updatePost = (id,values) => {
	
	return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  }).then(res => res.json())

}

export const voteComment = (id, option) => {
	console.log(`${api}/comments/${id}`);
  	return  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
  }).then(res => res.json())
}

export const updateComment = (comment,body) => {
	
	const newBody = {...body, timestamp:Date.now() }
	return fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBody)
  }).then(res => res.json())

}

export const updateCommentWithPostParentDeleted = (comment,body) => {
	
	return fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

}
    

export const deleteComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, { method: 'DELETE', headers, body: JSON.stringify({deletedFlad:true})})
    .then(res => res.json())

export const deletePost = (post) =>
  fetch(`${api}/posts/${post.id}`, { method: 'DELETE', headers, body: JSON.stringify({deletedFlad:true})})
    .then(res => res.json())
