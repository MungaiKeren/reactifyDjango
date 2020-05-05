import React, { Component } from 'react';
import 'whatwg-fetch';
import cookies from 'react-cookies';

class Posts extends Component {
  // initiate a method load Posts
  loadPosts(){
    const endpoint = '/api/posts/';
    let lookupOptions = {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
      },
    };

    fetch(endpoint, lookupOptions)
    .then(function(response){//initiate a promise
      return response.json()
    }).then(function(responseData){
      console.log(responseData);
    }).catch(function(error){
      console.log("error", error);
    });
  };

  createPost(){
    const endpoint = 'api/posts';
    const csrfToken = cookie.load('csrftoken')
    let data = {
      "slug": "",
      "title": "",
      "content": "",
      "draft": false,
      "publish": null
    }

    if (csrfToken !== undefined){
      let lookupOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(data),
        credentials: 'include',
      }

      fetch(endpoint, lookupOptions)
      .then(function(response){
        return response.json()
      }).then(function(responseData){
        console.log(responseData);
      }).catch(function(error){
        console.log("error", error);
      })
    }
    
  }

  componentDidMount(){
    this.loadPosts(); // load the posts
  }

  render() {
    return (
      <h1>Hello posts! this should log</h1>
    );
  }
}

export default Posts;
