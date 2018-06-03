import React, { Component } from 'react';
import Post from './Post';

class CategoryView extends Component {
  state = {
    posts: undefined
  }

  /*
    TODO: This CategoryView should be deleted or make it a Functional Stateless component
    FeedView later will have four blocks, kindly look into the block details in FeedView component.
  */

  componentDidMount() {
    // Posts of certain category GET Call
    fetch(`http://localhost:3001/${this.props.location.state.category}/posts`, {
      headers: {
        'Authorization': 'Basic '+btoa('shashi:123')
      }
    }).then(res => res.json()).then(res => {
      // TODO: Dispatch actions to update the store with this data.
      this.setState({ posts: res });
    });
  }

  render() {
    if (this.state.posts === undefined) {
      return null;
    } else if (this.state.posts.length === 0) {
      return (
        <div className='noResults'>
          No Posts found for {this.props.location.state.category}
        </div>
      )
    }
    return (
      <div className='categoryView'>
        {this.state.posts.map(post => <Post {...post} key={post.id}/>)}
      </div>
    );
  }
}

export default CategoryView;
