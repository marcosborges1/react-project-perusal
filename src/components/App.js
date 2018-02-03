import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './Navigation'
import Categories from './Categories'
import ListPosts from './ListPosts'
import CreatePost from './CreatePost'
import { Row,Col } from 'react-bootstrap'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux' 
import { fetchPosts, fetchCategories } from '../actions'

class App extends Component {

  componentDidMount() {

    const {getPostsAPI, getCategoriesAPI} = this.props
    getPostsAPI(); 
    getCategoriesAPI();

  }

  render() {

    const {categories,posts} = this.props

    return (
      <div className="container">
        <Row>
          <Col md={12} xs={3}>
            <Navigation />
          </Col>
        </Row>
        <Route exact path="/" render={()=> (
            <Row>
              <Col md={2} xs={3}>
                <Categories categories={categories} />
              </Col>
              <Col md={10} xs={9}>
                <ListPosts />
              </Col>
            </Row>
        )}/>
        <Route path="/post/create" render={({history})=> (
          <Row>
              <Col md={2} xs={3}>
                <Categories categories={categories} />
              </Col>
              <Col md={10} xs={9}>
                <CreatePost categories={categories} history={history} />
              </Col>
          </Row>
        )} />
    
      </div>
    );
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
      // addPost : (data) => dispatch(addPost(data)),
      getPostsAPI: () => dispatch(fetchPosts()),
      getCategoriesAPI: () => dispatch(fetchCategories()),
  }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
