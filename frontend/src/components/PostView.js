import React, { Component } from 'react';
import Post from './Post';
import Comment from './Comment';
import { connect } from 'react-redux';
import { initializeComments, initializePosts, initializeCategories } from '../actions';
import Modal from './subs/Modal';
import CreateComment from './CreateComment';
import Header from './subs/Header';
import RightPane from './panes/RightPane';

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
    fetch(`http://localhost:3001/posts/${this.props.location.pathname.split('/')[2]}/comments`, {
      headers: {
        'Authorization': 'Basic '+ btoa('shashi:123')
      }
    }).then(res => res.json()).then(res => {
      this.props.initializeComments(res);
    });

    if (this.props.categories && Object.keys(this.props.categories).length === 0 && this.props.categories.constructor === Object) {
      // Categories GET Call
      fetch('http://localhost:3001/categories', {
        headers: {
          'Authorization': 'Basic '+ btoa('shashi:123')
        }
      }).then(res => res.json()).then(res => {
        this.props.initializeCategories(res.categories);
      });
    }

    if (this.props.post === undefined) {
      // Posts GET Call
      fetch('http://localhost:3001/posts', {
        headers: {
          'Authorization': 'Basic '+btoa('shashi:123')
        }
      }).then(res => res.json()).then(res => {
        this.props.initializePosts(res);
      });
    }
  }

  getPostDetailView(styles) {
    return (
      <div style={styles.site}>
        <div style={styles.postView}>
          <Post {...this.props.post} key={this.props.post.id} onCommentClick={this.showCommentModal}/>
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
              parentId={this.props.post.id} />
          </Modal>
        </div>
      </div>
    );
  }

  getPostNotFoundView(styles) {
    return (
      <div style={styles.site}>
        <div style={styles.postView}>
          Post not found.
        </div>
      </div>
    );
  }

  render() {
    const styles = {
      addComment: {
        margin: '10px',
        width: '800px',
        padding: '15px'
      },
      siteWrapper: {
        display: 'flex',
        flexDirection: "column",
        minHeight: '100vh'
      },
      site: {
        display: 'flex',
        flexGrow: '1',
        background: '#e9ebee'
      },
      postView: {
        marginTop: '50px'
      },
      postNotFoundView: {
        marginLeft: '50px'
      },
    }
    const post = this.props.post;
    return (

      <div style={styles.siteWrapper}>
        <Header headerText="Readable"/>
        {
          this.props.comments === undefined || this.props.post === undefined || this.props.post.deleted === true
          ? this.getPostNotFoundView(styles)
          : this.getPostDetailView(styles)
        }
        {this.props.categories && <RightPane categories={this.props.categories}/>}
      </div>
    );
  }
}

const mapStateToProps = ({ posts, comments, categories }, props) => {
  // Converting posts object to array
  // pathname will look something like this /:category/:postId
  const postId = props.location.pathname.split('/')[2];
  const postsArray = Object.keys(posts).map(k => posts[k]).filter(post => post.id === postId);
  const commentsArray = Object.keys(comments).map(k => comments[k]).filter(comment => comment.parentId === postId);
  return ({
    categories,
    comments: commentsArray,
    post: postsArray[0]
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeCategories: (data) => dispatch(initializeCategories(data)),
    initializeComments: (data) => dispatch(initializeComments(data)),
    initializePosts: (data) => dispatch(initializePosts(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
