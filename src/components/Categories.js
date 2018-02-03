import React from 'react';
import {Link} from 'react-router-dom'
import {Well, ListGroup,ListGroupItem} from 'react-bootstrap'

const Categories = (props) => {


	const {categories} = props
	return (
		<div>
			<Well bsSize="small"><b className="name-colum">Categories</b></Well>
	        <ListGroup>
	            {categories.length>0 && categories.map(category => {
	            	return (
	            		<ListGroupItem key={category.path}><Link  to={`/category/${category.path}`}>{category.name}</Link></ListGroupItem>	
	            	)
	            })}
	        </ListGroup>
        </div>
	)
}

export default Categories


