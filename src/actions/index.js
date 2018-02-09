import * as API from '../utils/API';
export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const GET_COMMENTSBYPOST = 'GET_COMMENTSBYPOST'


//Posts

export function fetchPosts() {
	
	return (dispatch) => {
		API.getAllPosts().then(posts => dispatch({
				type: GET_POSTS, 
				posts
		}))
	}
	
}

export function addPost(values={}) {
	return (dispatch) => {
		API.createPost(values).then(posts=> dispatch({
			type: ADD_POST,
			values
		}))
	}
}

export function updatePost(id, values={}) {
	return (dispatch) => {
		API.updatePost(id, values).then(post=> dispatch({
			type: UPDATE_POST,
			post
		}))
	}
}

export function votePost(id,option) {
	return (dispatch) => {
		API.votePost(id, option).then(posts=> dispatch({
			type: VOTE_POST,
			id,
			option,
			voteScore:posts.voteScore
		}))
	}
}

export function deletePost(post) {
	return (dispatch) => {
		API.deletePost(post).then(result=> {
				console.log(result)
			return dispatch({
				type: DELETE_POST,
				id:result.id
			})
		})
	}
}


//Comments

export function addComment(values={}) {
	return (dispatch) => {
		API.createComment(values).then(comments=> dispatch({
			type: ADD_COMMENT,
			values
		}))
	}
}

export function voteComment(id,option) {
	return (dispatch) => {
		API.voteComment(id, option).then(comments=> dispatch({
			type: VOTE_COMMENT,
			id,
			option,
			voteScore:comments.voteScore
		}))
	}
}



export function deleteComment(comment) {
	return (dispatch) => {
		API.deleteComment(comment).then(result=> dispatch({
			type: DELETE_COMMENT,
			id:comment.id
		}))
	}
}

export function updateComment(comment, body) {

	// console.log(body)
	return (dispatch) => {
		API.updateComment(comment,body).then(result=> {
				console.log(result)
				return dispatch({
					type: UPDATE_COMMENT,
					id: result.id,
					timestamp: result.timestamp,
					body:result.body,
					parentDeleted:result.parentDeleted
				})
		})
	}
}

export function updateCommentWhenPostDeleted(id) {
	
	return (dispatch) => {
		API.getCommentsByPost(id).then(comments => {
			comments.map(comment=> {		
				return API.updateCommentWithPostParentDeleted(comment,{parentDeleted:true})
			})
		})
	}
	
}

export function getCommentsByPost(id) {
	
	return (dispatch) => {
		API.getCommentsByPost(id).then(comments => {
				// console.log(comments)
				return dispatch({type: GET_COMMENTSBYPOST, comments})
			}
		)
	}
	
}

//Categories

export function fetchCategories() {
	
	return (dispatch) => {
		API.getAllCategories().then(categories => dispatch({type: GET_CATEGORIES, categories}))
	}
	
}