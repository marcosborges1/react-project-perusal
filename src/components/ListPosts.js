import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Media,Well,Glyphicon} from 'react-bootstrap'
import Moment from 'react-moment'

class ListPosts extends Component {


	render() {

		const {posts} = this.props
		console.log(posts)

		return (
			<div>
				<Well bsSize="small"><b className="name-colum">List Posts</b> 
	                <div className="order-comments">
	                	<Link to="/post/create" className="add"><Glyphicon glyph="plus-sign" /></Link>
	                  <span>Order comments: </span>
	                  <select defaultValue="voteScore">
	                    <option value="voteScore">vote score</option>
	                    <option value="creationDate">creation date</option>
	                  </select>
	                </div>
	              </Well>
	            {posts.length>0 && posts.map(post => {
	            	return (
            			<Media key={post.id}>
			              <Media.Left>
			                 <Link to={`/posts/${post.id}`} className="link-details">
			                  <Glyphicon glyph="eye-open"/>
			                </Link>
			              </Media.Left>
			              <Media.Body>
			                <Media.Heading>
			                	<span className='ident-post'>{post.title}</span>
			                </Media.Heading>
			                <p className='ident-post'>
			                 {post.body}
			                </p>
			                <a className="vote-up" href="#"><Glyphicon glyph='thumbs-up'/></a>
							<a className="vote-down" href="#"><Glyphicon glyph='thumbs-down'/></a>
			                <br/>
			                <small> Author: <b>{post.author}</b> (<Moment format="YYYY/MM/DD HH:mm">{post.timestamp}</Moment>)</small>
			                <a href="#" className="comments-count">{post.commentCount==0 ? 'Be the first to comment': (`${post.commentCount} comment` + (post.commentCount>0 ? 's': ''))}</a>
			              </Media.Body>
			              <hr/>
				        </Media>
	            	)
	            })}
	        </div>
		)
	}
}

export default ListPosts