import React from 'react';
import {Well, ListGroup,ListGroupItem} from 'react-bootstrap'

const Categories = (props) => {


	const {categories} = props
	return (
		<div>
			<Well bsSize="small"><b className="name-colum">Categories</b></Well>
	        <ListGroup>
	            {categories.map(category => {
	            	return (
	            		<ListGroupItem key={category.path} href={`/category/${category.path}`}>{category.name}</ListGroupItem>	
	            	)
	            })}
	        </ListGroup>
        </div>
	)
}

export default Categories


