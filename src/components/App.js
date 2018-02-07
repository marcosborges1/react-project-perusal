import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './Navigation'
import Categories from './Categories'
import ListPosts from './ListPosts'
import CreatePost from './CreatePost'
import ViewPost from './ViewPost'
import { Row } from 'react-bootstrap'
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

    return (
      <div className="container">
        <Row>
            <Navigation />
        </Row>
        <Route exact path="/" render={()=> (
            <Row>
                <Categories />
                <ListPosts />
            </Row>
        )}/>
        <Route path="/post/create" render={({history})=> (
          <Row>
                <Categories />
                <CreatePost history={history} />
          </Row>
        )} />

        <Route path="/:category/posts" render={({match})=> (
            <Row>
                <Categories />
                <ListPosts categorySelected={match.params.category} />
            </Row>
        )} />

         <Route path="/posts/:id" render={({match})=> (
            <Row>
                <Categories />
                <ViewPost id={match.params.id} />
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
      getPostsAPI: () => dispatch(fetchPosts()),
      getCategoriesAPI: () => dispatch(fetchCategories()),
  }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
