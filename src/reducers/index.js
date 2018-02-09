import { combineReducers } from 'redux';
import { ADD_POST, GET_POSTS, GET_CATEGORIES, VOTE_POST, GET_COMMENTSBYPOST, VOTE_COMMENT, ADD_COMMENT, DELETE_COMMENT,DELETE_POST, UPDATE_COMMENT, UPDATE_POST } from '../actions'

function post(state={}, action) {

	switch(action.type) {
		case ADD_POST: 
			return state.concat(action.values)
		case DELETE_POST: 
			return state.filter(post=>post.id!==action.id)
		case GET_POSTS: 
			state = action.posts
			return state
		case UPDATE_POST: 
			return state.map(result=> { 
					if(result.id===action.post.id) {
						result = action.post
						return result
					}
				return result
			})
		case VOTE_POST:
			return state.map(result=> { 
					if(result.id===action.id) {
						 result.voteScore = action.voteScore
						 return result
					}
				return result
			})
		default: 
			return state
	}

}

function comments(state={}, action) {

	// console.log(action.comment)

	switch(action.type) {
		case ADD_COMMENT: 
			return state.concat(action.values)
		case UPDATE_COMMENT: 
			return state.length>0 && state.map(result=> { 
					if(result.id===action.id) {
						 result.timestamp = action.timestamp
						 result.body = action.body
						 return result
					}
				return result
			})
		case DELETE_COMMENT: 
			return state.filter(comment=>comment.id!==action.id)
		case GET_COMMENTSBYPOST: 
			state = action.comments
			return state
		case VOTE_COMMENT:
			return state.map(result=> { 
					if(result.id===action.id) {
						 result.voteScore = action.voteScore
						 return result
					}
				return result
			})
		default: 
			return state
	}
}

function category(state={}, action) {

	switch(action.type) {
		case GET_CATEGORIES: 
			state = action.categories
			return state
		default: 
			return state
	}

}


export default combineReducers({ post, category, comments })

