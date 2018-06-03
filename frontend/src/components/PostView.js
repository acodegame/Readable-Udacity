import React, { Component } from 'react';
import Post from './Post';
import Comment from './Comment';
import { connect } from 'react-redux';
import { initializeComments } from '../actions';
import Modal from './subs/Modal';
import CreateComment from './CreateComment';
import * as Constants from '../constants';

/**
 *  TODO - Comment count is not updating, have to do something where we need to catch
 *  addComment action twice in Post reducer as well as in Comments reducer.
 */
class PostView extends Component {
  state = {
    show: false,
  }

  showCommentModal = () => {
    this.setState({ show: true });
  }

  hideCommentModal = () => {
    this.setState({ show: false });
  }

  componentDidMount() {
    /*
      TODO: Check first in the store cache if it doesn't have enough comments
      then make a call.
    */
    // Getting comments of a certain posts to display in Detail view
    fetch(`http://localhost:3001/posts/${this.props.location.state.post.id}/comments`, {
      headers: {
        'Authorization': 'Basic '+ btoa('shashi:123')
      }
    }).then(res => res.json()).then(res => {
      this.props.initializeComments(res);
    });
  }

  render() {
    const styles = {
      addComment: {
        margin: '10px',
        width: '800px',
        padding: '15px'
      }
    }
    if (this.props.comments === undefined) {
      return null;
    }
    const post = this.props.post;
    return (
      <div className='postView'>
        <Post {...post} key={post.id} onCommentClick={this.showCommentModal}/>
        <div className='comments'>
          {this.props.comments.map(comment => <Comment {...comment} key={comment.id} />)}
        </div>
        <input
          onFocus={ this.showCommentModal }
          style={styles.addComment}
          placeholder="Add your comment here..."
        />
        <Modal show={this.state.show} handleClose={this.hideCommentModal}>
          <CreateComment
            afterSubmit={this.hideCommentModal}
            parentId={post.id} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, comments }, props) => {
  // Converting posts object to array
  const postId = props.location.state.post.id;
  const postsArray = Object.keys(posts).map(k => posts[k]).filter(post => post.id === postId);
  const commentsArray = Object.keys(comments).map(k => comments[k]).filter(comment => comment.parentId === postId);
  return ({
    comments: commentsArray,
    post: postsArray[0]
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeComments: (data) => dispatch(initializeComments(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
