import React, {Component} from 'react';
import {Well,Col} from 'react-bootstrap'
import { connect } from 'react-redux' 
import { addPost, updatePost} from '../actions'
import { Form, Field } from 'react-final-form'
import Styles from './Styles'


class CreatePost extends Component {

	//Nao sei pegar os props da stateToProps e setá-los no state, antes do render
	state = {
		author: '',
		title: '',
		body: '',
		category: '',
		showForm:true
	}


 	existPost = async () => {

  		await sleep(500)
  		return (this.props.existingPost[0]) ? true:false 
	}

	loadData = () => {

		return {
			author:  this.props.existingPost[0].author,
			title: this.props.existingPost[0].title,
			body: this.props.existingPost[0].body,
			category: this.props.existingPost[0].category,
		}
	}


  	async componentDidMount() {

  		if(this.props.id) {
	    	this.setState({ loading: true })
	    	if(await this.existPost()) {
	    		const data =  this.loadData()
	    		this.setState({data})
	    	}
	    	else {
	    		this.setState({showForm:false})
	    	}
	    	this.setState({ loading: false })
    	}
  	}

  	onSubmit = async (values) => {
  	
  		const {id, add, update, history } = this.props
		if(!id) {
			const defaultValues = {id: Math.random().toString(36).substr(1, 10)+Math.random().toString(36).substr(2, 9), voteScore: 0, deleted: false, commentCount:0, timestamp:Date.now()} 
			const newValues = {...values, ...defaultValues}
			add(newValues)
		}
		else {
			update(id, values)
		}
		
		history.push('/')
	  // window.alert(JSON.stringify(values, 0, 2))
	}

		
	render() {	

		const {categories, id} =  this.props
		// console.log(existingPost)
		const {showForm} = this.state
		return (
			
			<div>
			
			
				<div>
					<Col md={10} xs={9}>
					<Well bsSize="small"><b className="name-colum">{id || !showForm ? 'Edit Post': 'Create Post'}</b></Well>
					<Styles>
					{!showForm && ( <strong className='information-no'>No post with id: {id}</strong>)}
					{showForm && (
					<Form 
						onSubmit={this.onSubmit} 
						validate={initalValidate}
						initialValues={this.state.data} 
						render={({ handleSubmit, pristine, reset, submitting, values }) => {
				            return (
				              	<form onSubmit={handleSubmit}>
						              {this.state.loading && <div className="loading" />}

						              	<Field name="author" validate={required}>
								            {({ input, meta }) => (
								              <div>
								                <label>Author</label>
								                <input {...input} type="text" placeholder="Author" />
								                {meta.error && meta.touched && <span>{meta.error}</span>}
								              </div>
								            )}
								        </Field>
 										<Field name="title" validate={required}>
								            {({ input, meta }) => (
								              <div>
								                <label>Title</label>
								                <input {...input} type="text" placeholder="Title" />
								                {meta.error && meta.touched && <span>{meta.error}</span>}
								              </div>
								            )}
								        </Field>

								        <Field name="body" component="textarea" validate={required}>
								            {({ input, meta }) => (
								              <div>
								                <label>Body</label>
								                <textarea {...input} type="text" placeholder="Body" />
								                {meta.error && meta.touched && <span>{meta.error}</span>}
								              </div>
								            )}
								        </Field>

										<Field name="category" component="select" validate={required}>
								            {({ input, meta }) => (
								              <div>
								                <label>Category</label>
								                <select {...input}>
									                <option key="" value="">Select</option>
													{categories.length>0 && categories.map((category, index)=> {
														return (
															<option key={category.path} value={category.path}>{category.name}</option>
														)
													})}
												</select>
								                {meta.error && meta.touched && <span>{meta.error}</span>}
								              </div>
								            )}
								        </Field>						                

						                <div className="buttons">
						                  <button type="submit" disabled={submitting || pristine}>
						                    Submit
						                  </button>
						                  <button
						                    type="button"
						                    onClick={reset}
						                    disabled={submitting || pristine}>
						                    Reset
						                  </button>
						                </div>
				              	</form>
				             )
				       		}
				   		}
				    />)}
				    </Styles>

				</Col>	
				</div>
	        

			</div>

	)


	}


}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const required = value => (value ? undefined : "Required");





const initalValidate = (values) => {

	const errors = {};
	 if (!values.author) {
	  errors.author = "Required";
	}
	if (!values.title) {
	  errors.title = "Required";
	}
	if (!values.body) {
	  errors.body = "Required";
	}
	 if (!values.category) {
	  errors.category = "Required";
	}
	return errors;
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