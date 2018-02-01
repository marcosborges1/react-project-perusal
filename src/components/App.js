import React, { Component } from 'react';
import '../App.css';
import * as CommentsAPI from '../utils/CommentsAPI';
import 'bootstrap/dist/css/bootstrap.css';
import Categories from './Categories'
import ListPosts from './ListPosts'
import CreatePost from './CreatePost'
import {Row,Col} from 'react-bootstrap'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux' 
import {addPost, fetchPosts} from '../actions'

class App extends Component {

  state = {
    categories:[], 
    postsa:[],
  }
  // componentDidMount() {
  //   CommentsAPI.getAllCategories().then(categories=>this.setState({categories}));
  //   CommentsAPI.getAllPosts().then(postsa=> this.setState({postsa}))
  // }

  // render() {

    
  //   const {categories,posts} = this.state
  //   console.log(this.props)

  //   return (
  //     <div className="container">
  //       <Row>
  //         <Col md={12}>&nbsp;</Col>
  //         <Col md={12}>&nbsp;</Col>
  //       </Row>
  //       <Route exact path="/" render={()=> (
  //           <Row>
  //             <Col md={2} xs={3}>
  //               <Categories categories={categories} />
  //             </Col>
  //             <Col md={10} xs={9}>
                
  //             </Col>
  //           </Row>
  //       )}/>
  //       <Route path="/post/create" render={()=> (
  //         <Row>
  //             <Col md={2} xs={3}>
  //               <Categories categories={categories} />
  //             </Col>
  //             <Col md={10} xs={9}>
  //               <CreatePost categories={categories} />
  //             </Col>
  //         </Row>
  //       )} />
    
  //     </div>
  //   );
  // }

  componentDidMount() {

    this.props.fetchData();

  }

  render() {
    
    const { posts } = this.props

    return (
      <div>
        <ListPosts posts={posts}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  
  return {
    posts:state.post
  }

}

const mapDispatchToProps = (dispatch) => {

  return {
      addPost : (data) => dispatch(addPost(data)),
      fetchData: () => dispatch(fetchPosts())
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(App);
// <ListPosts posts={posts}/>
