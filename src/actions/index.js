import * as CommentsAPI from '../utils/CommentsAPI';
export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const ADD_COMMENT = 'ADD_COMMENT'


export function addPost(values={}) {
	return (dispatch) => {
		CommentsAPI.createPost(values).then(posts=> dispatch({
			type: ADD_POST,
			values
		}))
	}
}

export function votePost(id,option) {
	return (dispatch) => {
		CommentsAPI.votePost(id, option).then(posts=> dispatch({
			type: VOTE_POST,
			id,
			option,
			voteScore:posts.voteScore
		}))
	}
}


export function fetchPosts() {
	
	return (dispatch) => {
		CommentsAPI.getAllPosts().then(posts => dispatch({type: GET_POSTS, posts}))
	}
	
}

export function fetchCategories() {
	
	return (dispatch) => {
		CommentsAPI.getAllCategories().then(categories => dispatch({type: GET_CATEGORIES, categories}))
	}
	
}

export function addComment({values}) {
	return {
		type: ADD_COMMENT,
		values
	}
}