import React from 'react';
import {Link} from 'react-router-dom'
import {Well, Col, ListGroup,ListGroupItem} from 'react-bootstrap'
import { connect } from 'react-redux' 

const Categories = (props) => {

	const {categories} = props
	return (
		<div>
			<Col md={2} xs={3}>
				<Well bsSize="small"><b className="name-colum">Categories</b></Well>
		        <ListGroup>
		            {categories.length>0 && categories.map(category => {
		            	return (
		            		<ListGroupItem key={category.path}><Link  to={`/${category.path}/posts`}>{category.name}</Link></ListGroupItem>	
		            	)
		            })}
		        </ListGroup>
	        </Col>
        </div>
	)
}

const mapStateToProps = (state) => {
  
  return {
    categories:state.category
  }

}

export default connect(mapStateToProps)(Categories);


