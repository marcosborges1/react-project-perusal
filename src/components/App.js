import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Categories from './Categories'
import ListPosts from './ListPosts'
import CreatePost from './CreatePost'
import ViewPost from './ViewPost'
import Navigation from './Navigation'
import { Row } from 'react-bootstrap'
import { Route, withRouter, Switch } from 'react-router-dom'
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
        <div>
          <h2>Perusal Project</h2>
        </div>
        
        <Switch>
          <Route exact path="/" render={()=> (
              <Row>
                  <Categories />
                  <ListPosts />
              </Row>
            
          )}/>
          
           <Route exact path="/post/create" render={({history})=> (
            <Row>
                  <Navigation />
                  <Categories />
                  <CreatePost history={history} />
            </Row>
          )} />

          <Route exact path="/:category" render={({match})=> (
              <Row>
                  <Navigation />
                  <Categories />
                  <ListPosts categorySelected={match.params.category} />
              </Row>
          )} />

           <Route exact path="/:category/:id" render={({match, history})=> (
              <Row>
                  <Navigation />
                  <Categories />
                  <ViewPost id={match.params.id} history={history} />
              </Row>
          )} />

          <Route exact path="/:category/:id/edit" render={({match, history})=> (
              <Row>
                  <Navigation />
                  <Categories />
                  <CreatePost history={history} id={match.params.id} />
              </Row>
          )} />

        </Switch>
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
