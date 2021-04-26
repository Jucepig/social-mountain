import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios
    .get('https://practiceapi.devmountain.com/api/posts')
    .then( (res) => { 
      this.setState({
        posts: res.data
      }) 
    })
    .catch( err => {
      console.log('Failed to retrieve posts from GET request. err =' + err)
    })
  }

  updatePost(id, text) {
    axios
    .put(`https://practiceapi.devmountain.com/api/posts?id=${id}` , {text})
    .then( (res) => {
      this.setState({
        posts: res.data
      })
    })
    .catch(err => {
      console.log('Failed to retrieve posts from PUT request. err =' + err)
    })
  }

  deletePost(id) {
    axios
    .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then( (res) => {
      this.setState({
        posts: res.data
      })
    })
    .catch(err => {
      console.log('Failed to retrieve posts from DELETE request. err =' + err)
    })
  }

  createPost(text) {
    axios
    .post("https://practiceapi.devmountain.com/api/posts", {text})
    .then( (res) => {
      this.setState({
        posts: res.data
      })
    })
    .catch(err => {
      console.log('Failed to retrieve posts from POST request. err =' + err)
    })
  }

  filterPosts = (text) => {
    const encoded = encodeURI(text)
    axios
    .get(`https://practiceapi.devmountain.com/api/posts/filter?text=${encoded}`)
    .then( (res) => {
      this.setState({
        posts: res.data
      })
    })
    .catch(err => {
      console.log('Failed to retrieve posts from POST request. err =' + err)
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filterPostsFn={this.filterPosts} />

        <section className="App__content">

          <Compose
            createPostFn={this.createPost}
          />
          {
            posts.map(post => {
              return (
                <Post 
                  key={post.id} 
                  text={post.text}
                  date={post.date}
                  id={post.id}
                  updatePostFn={this.updatePost}
                  deletePostFn={this.deletePost}
                />
                )
              }
            )
          }
        </section>
      </div>
    );
  }
}

export default App;
