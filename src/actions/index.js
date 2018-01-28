const ADD_POST = 'ADD_POST'
const ADD_COMMENT = 'ADD_COMMENT'

export function addPost({values}) {
	return {
		type: ADD_POST,
		values
	}
}