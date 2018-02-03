import React from 'react';
import {Well,Form, Col,FormGroup,Button, FormControl,ControlLabel} from 'react-bootstrap'
import serializeForm from "form-serialize"
import { connect } from 'react-redux' 
import { addPost} from '../actions'


const CreatePost = (props) => {

	const {categories} =  props
	console.log(this.context)

	return (
		<div>
			<Well bsSize="small"><b className="name-colum">Create Post</b></Well>
			<Form horizontal onSubmit={(e)=> handleSubmit(props,e)} id="form-post">
				<FormGroup controlId="author">
					<Col componentClass={ControlLabel} sm={2}>
						Author
					</Col>
					<Col sm={10}>
						<FormControl type='text' name="author" placeholder="Author"  />
					</Col>
				</FormGroup>
				<FormGroup controlId="title">
					<Col componentClass={ControlLabel} sm={2}>
						Title
					</Col>
					<Col sm={10}>
						<FormControl type='text' name="title" placeholder="Title"  />
					</Col>
				</FormGroup>
				<FormGroup controlId="body">
					<Col componentClass={ControlLabel} sm={2}>
						Body
					</Col>
					<Col sm={10}>
						<FormControl type="text" name="body" componentClass="textarea" placeholder="Body" />
					</Col>
				</FormGroup>
				<FormGroup controlId="category">
					<Col componentClass={ControlLabel} sm={2}>
						Category
					</Col>
					<Col sm={4}>
						<FormControl componentClass="select" name="category" placeholder="select">
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
        </div>
	)


}

const handleSubmit = (props, e) => {

	e.preventDefault()
	const id = Math.random().toString(36).substr(1, 10)+Math.random().toString(36).substr(2, 9)
	const valuesForm = serializeForm(e.target, {hash:true})
	const defaultValues = {id , voteScore: 0, deleted: false, commentCount:0, timestamp:Date.now()} 
	const values = {...valuesForm, ...defaultValues}
	props.add(values)
	props.history.push('/')


}



const mapDispatchToProps = (dispatch) => {

  return {
      add : (data) => dispatch(addPost(data)),
  }

}

export default connect(null, mapDispatchToProps)(CreatePost);