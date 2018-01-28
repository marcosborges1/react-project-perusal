import React from 'react';
import {Well,Form, Col,FormGroup,Button, FormControl,ControlLabel} from 'react-bootstrap'
import serializeForm from "form-serialize"
import Moment from 'react-moment'

// body
// category
// commentCount
// deleted
// id
// timestamp
// title
// voteScore

const CreatePost = (props) => {

	const {categories} =  props

	return (
		<div>
			<Well bsSize="small"><b className="name-colum">Create Post</b></Well>
			<Form horizontal onSubmit={handleSubmit} id="form-post">
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
							{categories.map((category, index)=> {
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

const handleSubmit = (e) => {
	e.preventDefault()
	const valuesForm = serializeForm(e.target, {hash:true})
	const defaultValues = {voteScore: 0, deleted: false, commentCount:0, timestamp:new Date().getTime()} 
	const values = {...valuesForm, ...defaultValues}
	
	// if(this.props.onCreateContact)
	// 	this.props.onCreateContact(values)
}


export default CreatePost


