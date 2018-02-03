import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Media,Well,Glyphicon} from 'react-bootstrap'
import Moment from 'react-moment'
import { connect } from 'react-redux' 
import { votePost} from '../actions'

class ListPosts extends Component {


	handleVote = (id, option, e) => {
		e.preventDefault();
// console.log(id, option)
		this.props.vote(id,option)
		
	}

	render() {

		// console.log(this.props)
		const {posts} = this.props

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
			                <span className={`margin-right ${post.voteScore>0 ? 'blue': 'red'}`}>({post.voteScore})</span>
			                <a className="vote-up" href='' onClick={(e)=>this.handleVote(post.id,'upVote',e)}><Glyphicon glyph='thumbs-up'/></a>
							<a className="vote-down" href='' onClick={(e)=>this.handleVote(post.id,'downVote',e)}><Glyphicon glyph='thumbs-down'/></a>
			                <br/>
			                <small> Author: <b>{post.author}</b> (<Moment format="YYYY/MM/DD HH:mm">{post.timestamp}</Moment>)</small>
			                <a href='' className="comments-count">{post.commentCount===0 ? 'Be the first to comment': (`${post.commentCount} comment` + (post.commentCount>0 ? 's': ''))}</a>
			              </Media.Body>
			              <hr/>
				        </Media>
	            	)
	            })}
	        </div>
		)
	}
}
const mapStateToProps = (state) => {
  
  return {
    posts:state.post,
    categories:state.category
  }

}

const mapDispatchToProps = (dispatch) => {

  return {
      vote : (id,option) => dispatch(votePost(id,option)),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);

// export default ListPosts
// export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ListPosts));
// <span className=`'margin-right + {post.voteScore>0 ? 'blue': 'red'}'>({post.voteScore})</span>
