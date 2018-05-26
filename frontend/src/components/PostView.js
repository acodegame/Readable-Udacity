import React, { Component } from 'react';
import Post from './Post';
import Comment from './Comment';

class PostView extends Component {
  state = {
    post: this.props.location.state.post,
    comments: undefined,
  }

  componentDidMount() {
    // Getting comments of a certain posts to display in Detail view
    fetch(`http://localhost:3001/posts/${this.props.location.state.post.id}/comments`, {
      headers: {
        'Authorization': 'Basic '+ btoa('shashi:123')
      }
    }).then(res => res.json()).then(res => {
      // TODO: Dispatch actions to update the store with this data.
      this.setState({ comments: res });
    });
  }

  render() {
    if (this.state.comments === undefined) {
      return null;
    }
    const post = this.state.post;
    return (
      <div className='postView'>
        <Post {...post} key={post.id}/>
        <div className='comments'>
          {this.state.comments.map(comment => <Comment {...comment} key={comment.id} />)}
        </div>
      </div>
    );
  }
}

export default PostView;
