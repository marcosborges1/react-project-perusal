import * as CommentsAPI from '../utils/CommentsAPI';
export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const GET_COMMENTSBYPOST = 'GET_COMMENTSBYPOST'

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

export function addComment(values={}) {
	return (dispatch) => {
		CommentsAPI.createComment(values).then(comments=> dispatch({
			type: ADD_COMMENT,
			values
		}))
	}
}

export function voteComment(id,option) {
	return (dispatch) => {
		CommentsAPI.voteComment(id, option).then(comments=> dispatch({
			type: VOTE_COMMENT,
			id,
			option,
			voteScore:comments.voteScore
		}))
	}
}

export function deleteComment(comment) {
	return (dispatch) => {
		CommentsAPI.deleteComment(comment).then(result=> dispatch({
			type: DELETE_COMMENT,
			id:comment.id
		}))
	}
}

export function updateComment(comment, body) {

	// console.log(body)
	return (dispatch) => {
		CommentsAPI.updateComment(comment,body).then(result=> {
				console.log(result)
				return dispatch({
					type: UPDATE_COMMENT,
					id: result.id,
					timestamp: result.timestamp,
					body:result.body,
				})
		})
	}
}



export function getCommentsByPost(id) {
	
	return (dispatch) => {
		CommentsAPI.getCommentsByPost(id).then(comments => {
				// console.log(comments)
				return dispatch({type: GET_COMMENTSBYPOST, comments})
			}
		)
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

// export function addComment({values}) {
// 	return {
// 		type: ADD_COMMENT,
// 		values
// 	}
// }