import * as CommentsAPI from '../utils/CommentsAPI';

export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const ADD_COMMENT = 'ADD_COMMENT'

export function addPost({values}) {
	return {
		type: ADD_POST,
		values
	}
}

// export function getPosts(posts) {
// 	type: GET_POSTS,
// 	posts
// }

export function fetchPosts() {
	
	return (dispatch) => {
		CommentsAPI.getAllPosts().then(posts => dispatch({type: GET_POSTS, posts}))
	}
	
}

export function addComment({values}) {
	return {
		type: ADD_COMMENT,
		values
	}
}