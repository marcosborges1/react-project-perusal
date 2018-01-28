import React, { Component } from 'react';
import '../App.css';
import * as CommentsAPI from '../utils/CommentsAPI';
import 'bootstrap/dist/css/bootstrap.css';
import Categories from './Categories'
import ListPosts from './ListPosts'
import CreatePost from './CreatePost'
import {Row,Col} from 'react-bootstrap'
import { Route } from 'react-router-dom'

class App extends Component {

  state = {
    categories:[], 
    posts:[],
  }
  componentDidMount() {
    CommentsAPI.getAllCategories().then(categories=>this.setState({categories}));
    CommentsAPI.getAllPosts().then(posts=> this.setState({posts}))
  }

  render() {

    const {categories,posts} = this.state

    return (
      <div className="container">
        <Row>
          <Col md={12}>&nbsp;</Col>
          <Col md={12}>&nbsp;</Col>
        </Row>
        <Route exact path="/" render={()=> (
            <Row>
              <Col md={2} xs={3}>
                <Categories categories={categories} />
              </Col>
              <Col md={10} xs={9}>
                <ListPosts posts={posts}/>
              </Col>
            </Row>
        )}/>
        <Route path="/post/create" render={()=> (
          <Row>
              <Col md={2} xs={3}>
                <Categories categories={categories} />
              </Col>
              <Col md={10} xs={9}>
                <CreatePost categories={categories} />
              </Col>
          </Row>
        )} />
    
      </div>
    );
  }
}

export default App;
