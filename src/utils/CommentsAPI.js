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