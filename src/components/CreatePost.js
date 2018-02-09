import React, {Component} from 'react';
import {Well,Form, Col,FormGroup,Button, FormControl,ControlLabel} from 'react-bootstrap'
import serializeForm from "form-serialize"
import { connect } from 'react-redux' 
import { addPost, updatePost} from '../actions'


class CreatePost extends Component {

	//Nao sei pegar os props da stateToProps e setá-los no state, antes do render
	state = {
		author: '',
		title: '',
		body: '',
		category: ''
	}

   	//  handleChange(e) {
   	//  	this.setState({[e.target.name]: e.target.value});
  	// }
		
	render() {	

		const {categories,existingPost} =  this.props
		// const {author} = this.state
		
		return (

			(existingPost && (
			<div>
				<Col md={10} xs={9}>
					<Well bsSize="small"><b className="name-colum">{existingPost.length>0 ? 'Edit Post': 'Create Post'}</b></Well>
					<Form horizontal onSubmit={(e)=> handleSubmit(this.props,e)} id="form-post">

						<FormGroup controlId="author">
							<Col componentClass={ControlLabel} sm={2}>
								Author
							</Col>
							<Col sm={10}>
								<FormControl type='text' name="author" placeholder="Author" defaultValue={existingPost.length>0 ? existingPost[0].author:''} />
							</Col>
						</FormGroup>
						<FormGroup controlId="title">
							<Col componentClass={ControlLabel} sm={2}>
								Title
							</Col>
							<Col sm={10}>
								<FormControl type='text' name="title" placeholder="Title" defaultValue={existingPost.length>0 ? existingPost[0].title:''} />
							</Col>
						</FormGroup>
						<FormGroup controlId="body">
							<Col componentClass={ControlLabel} sm={2}>
								Body
							</Col>
							<Col sm={10}>
								<FormControl type="text" name="body" componentClass="textarea" placeholder="Body" defaultValue={existingPost.length>0 ? existingPost[0].body:''} />
							</Col>
						</FormGroup>
						<FormGroup controlId="category">
							<Col componentClass={ControlLabel} sm={2}>
								Category
							</Col>
							<Col sm={4}>
								<FormControl componentClass="select" name="category" placeholder="select" defaultValue={existingPost.length>0 ? existingPost[0].category:''}>
									<option key="" value="">Select</option>
									{categories.length>0 && categories.map((category, index)=> {
										return (
											<option key={category.path} value={category.path}>{category.name}</option>
										)
									})}
								</FormControl>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button type="submit"  bsStyle="primary">Send</Button>
							</Col>
						</FormGroup>
					</Form>
				</Col>
	        </div>
	       )
		)
	)
	}


}

const handleSubmit = (props, e) => {

	
	e.preventDefault()

	const valuesForm = serializeForm(e.target, {hash:true})
	
	if(!props.id) {
		const defaultValues = {id: Math.random().toString(36).substr(1, 10)+Math.random().toString(36).substr(2, 9), voteScore: 0, deleted: false, commentCount:0, timestamp:Date.now()} 
		const values = {...valuesForm, ...defaultValues}
		props.add(values)
	}
	else {
		props.update(props.id, valuesForm)
	}
	
	props.history.push('/')


}

const mapStateToProps = (state, props) => {
  
  return {	
    categories:state.category,
    existingPost: props.id ? state.post.length>0 && state.post.filter(res=>res.id===props.id) : {}
  }

}

const mapDispatchToProps = (dispatch) => {

  return {
      add : (data) => dispatch(addPost(data)),
      update : (id, data) => dispatch(updatePost(id, data)),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);