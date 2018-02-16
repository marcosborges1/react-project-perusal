import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Col, Media,Well,Form, Glyphicon, ListGroup, ListGroupItem, FormGroup,Button, FormControl,ControlLabel} from 'react-bootstrap'
import Moment from 'react-moment'
import { connect } from 'react-redux' 
import { votePost, getCommentsByPost, voteComment, addComment, deletePost, deleteComment, updateComment, updateCommentWhenPostDeleted } from '../actions'
import sortBy from 'sort-by'
import serializeForm from "form-serialize"
import Styles from './Styles'

class ViewPost extends Component {

	state = {
		sortComment:'-voteScore',
		showAddForm:false,
		numberEditForm:'',
	}

	async componentDidMount() {

		this.setState({ loading: true })
		await sleep(1000)
		
		const {getComments, id, posts} = this.props
		if(posts) getComments(id)

		this.setState({ loading: false })

		
	}

	handleVote = (id, option, e,  type='votePost') => {
		e.preventDefault();

		if(type==='votePost') {
			this.props.vote(id,option)
		} 
		else if(type==='voteComment') {
			this.props.voteComment(id,option)
		}
	}

	changeSortPost = (e) => {

		this.setState({
			sortPost:e.target.value
		})
	}

	handleSubmit = (e) => {

		const {id, addComment} = this.props

		e.preventDefault()
		const idComment = Math.random().toString(36).substr(1, 10)+Math.random().toString(36).substr(2, 9)
		const valuesForm = serializeForm(e.target, {hash:true})
		const defaultValues = {id:idComment, parentId:id, voteScore: 0, deleted: false, parentDeleted:false, timestamp:Date.now()} 
		const values = {...valuesForm, ...defaultValues}
		addComment(values)
		this.setState({showAddForm:false})

	}
	updateComment = (comment, e) => {

		e.preventDefault();
		const valuesForm = serializeForm(e.target, {hash:true})
		this.props.updateComment(comment, valuesForm)
		this.showEditFormNumber('',e)

	}
	showForm = (showAddForm, e) => {

		e.preventDefault();
		this.setState({showAddForm})

	}
	showEditFormNumber = (numberEditForm,e) => {

		e.preventDefault();
		this.setState({numberEditForm})
	}

	removeComment = (comment,e) => {

		e.preventDefault();
		this.props.deleteComment(comment)
		
	}

	removePost = (post,e) => {

		const {deletePost, updateCommentWhenPostDeleted, history} = this.props
		e.preventDefault();

		updateCommentWhenPostDeleted(post.id)
		deletePost(post)
		history.push('/')
		
	}

	render() {

		const {posts, comments, id} = this.props
		const {sortComment, showAddForm, numberEditForm} = this.state

		// console.log(posts)

		return (
			<div>
			 	<Col md={10} xs={9}>
					<Well bsSize="small"><b className="name-colum">View Post</b></Well>
					<Styles>
					{this.state.loading && <div className="loading" />}
					</Styles>
					{(!posts || posts.length===0) && <strong className='information-no'>No post with id: {id}</strong>}
		            {posts.length>0 && posts.map(post => {
		            	return (
	            			<Media key={post.id}>
				              <Media.Body>
				                <Media.Heading>
				                	<span className='ident-post'>{post.title}</span>
				                	<span className='edit-comment'><a href='' onClick={(e)=>this.removePost(post,e)}><Glyphicon glyph='remove' /></a></span>
									<span className='edit-comment'><Link to={`/${post.category}/${post.id}/edit`}><Glyphicon glyph='pencil' /></Link></span>
				                
									
				                </Media.Heading>
				                <p className='ident-post'>
				                 {post.body}
				                </p>
				                <span className={`margin-right ${post.voteScore>0 ? 'blue': 'red'}`}>({post.voteScore})</span>
				                <a className="vote-up" href='' onClick={(e)=>this.handleVote(post.id,'upVote',e)}><Glyphicon glyph='thumbs-up'/></a>
								<a className="vote-down" href='' onClick={(e)=>this.handleVote(post.id,'downVote',e)}><Glyphicon glyph='thumbs-down'/></a>
				                <br/>
				                <small> Author: <b>{post.author}</b> (<Moment format="YYYY/MM/DD HH:mm">{post.timestamp}</Moment>)</small>
			                	
				                <div className='container-comments'>
					                <b className='comment'>&raquo; Comments</b>
				                	<ListGroup>
				                		{!comments && (
						                	<strong className='information-no'>No Comments</strong>
						                )}
						                {comments.length>0 && comments.sort(sortBy(sortComment)) && comments.map(comment=>{
						                	return (
										        <ListGroupItem key={comment.id}>

										        	{numberEditForm!==comment.id && comment.body}

										        	{numberEditForm===comment.id && (
											        	<Form horizontal onSubmit={(e)=> this.updateComment(comment, e)} id="form-comment">
												        	<FormGroup controlId="comment">
														      	<Col componentClass={ControlLabel} sm={2}>
																	Comment
																</Col>
																<Col sm={10}>
														      		<FormControl componentClass="textarea" name="body" placeholder="Comment" defaultValue={comment.body} />
														      	</Col>														      	
														    </FormGroup>
														    <FormGroup>
																<Col smOffset={2} sm={10}>
																	<Button type="submit"  bsStyle="primary">Update</Button> &nbsp;
																	<Button type="reset" onClick={(e)=>this.showEditFormNumber('',e)} bsStyle="danger" >Cancel</Button>
																</Col>
															</FormGroup>
													    </Form>
												    )}
										        	{numberEditForm!==comment.id && (
										        		<div>
												        	<span className='edit-comment'><a href='' onClick={(e)=>this.removeComment(comment,e)}><Glyphicon glyph='remove' /></a></span>
												        	<span className='edit-comment'><a href='' onClick={(e)=>this.showEditFormNumber(`${comment.id}`,e)}><Glyphicon glyph='pencil' /></a></span>
												        	<br/>
												         	<span className={`margin-right ${comment.voteScore>0 ? 'blue': 'red'}`}>({comment.voteScore})</span>
							                				<a className="vote-up" href='' onClick={(e)=>this.handleVote(comment.id,'upVote',e,'voteComment')}><Glyphicon glyph='thumbs-up'/></a>
															<a className="vote-down" href='' onClick={(e)=>this.handleVote(comment.id,'downVote',e,'voteComment')}><Glyphicon glyph='thumbs-down'/></a>
															<br/>
															<small> Author: <b>{comment.author}</b> (<Moment format="YYYY/MM/DD HH:mm">{comment.timestamp}</Moment>)</small>
														</div>
													)}
										        </ListGroupItem>
						                	)
						                })}

						                
						            </ListGroup>
						            {!showAddForm && (<a href='' onClick={(e)=> this.showForm(true,e)} className="comments-count">Add Comment</a>)}
						            {showAddForm && (
							            <span>
							            	<Form horizontal onSubmit={(e)=> this.handleSubmit(e)} id="form-comment">
								            	<FormGroup controlId="author">
													<Col componentClass={ControlLabel} sm={2}>
														Author
													</Col>
													<Col sm={10}>
														<FormControl type='text' name="author" placeholder="Author"  />
													</Col>
												</FormGroup>
								            	<FormGroup controlId="comment">
											      	<Col componentClass={ControlLabel} sm={2}>
														Comment
													</Col>
													<Col sm={10}>
											      		<FormControl componentClass="textarea" name="body" placeholder="Comment" />
											      	</Col>
											    </FormGroup>
											    <FormGroup>
													<Col smOffset={2} sm={10}>
														<Button type="submit"  bsStyle="primary">Send</Button> &nbsp;
														<Button type="reset" onClick={(e)=>this.showForm(false,e)} bsStyle="danger" >Cancel</Button>
													</Col>
												</FormGroup>
										    </Form>
							            </span>
						            )}
						        </div>
			                	
				                
				              </Media.Body>
					        </Media>
		            	)
		            })}
				
	            </Col>
	        </div>
		)
	}
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const mapStateToProps = (state,props) => {
  
  return {
  	posts:state.post.length>0 && state.post.filter(res=>res.id === props.id),
    categories:state.category,
    comments: state.comments.length>0 && state.comments.filter(res=>res.deleted===false)
  }

}

const mapDispatchToProps = (dispatch) => {

  return {
      vote : (id,option) => dispatch(votePost(id,option)),
      voteComment : (id,option) => dispatch(voteComment(id,option)),
      getComments : (id) => dispatch(getCommentsByPost(id)),
      addComment : (data) => dispatch(addComment(data)),
      deletePost : (post) => dispatch(deletePost(post)),
      deleteComment : (comment) => dispatch(deleteComment(comment)),
      updateComment: (comment, body) => dispatch(updateComment(comment,body)),
      updateCommentWhenPostDeleted : (id) => dispatch(updateCommentWhenPostDeleted(id)),

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
