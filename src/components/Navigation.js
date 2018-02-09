import React from 'react'
import {Link} from 'react-router-dom'
import {Glyphicon, Col} from 'react-bootstrap'


const Navigation = () => {

	return (
		<div className="navigation">
			<Col md={12} xs={12}>
				<Link to="/" ><Glyphicon className="go-back" glyph="arrow-left" /></Link>
			</Col>
		</div>
	)
}

export default Navigation