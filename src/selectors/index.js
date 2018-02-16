import { createSelector } from 'reselect'
import sortBy from 'sort-by'

const getPosts = (post) => { return post }

export const getOrderedPosts = createSelector(

	[getPosts],
	(posts) => {
		console.log(posts)
		return posts.length>0 && posts.sort(sortBy('-voteScore'))
	}

)