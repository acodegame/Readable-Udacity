import React, { Component } from 'react';
import Post from '../Post';
import CreatePost from '../CreatePost';
import Modal from '../subs/Modal';
import * as Constants from '../../constants';

/**
 *  Class for displaying the Middle pane.
 *  Contains Create Posts card and Posts list.
 *  This pane will be scrollable as infinite-scroll.
 */
class MiddlePane extends Component {
  state = {
      showModal: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {

  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const styles = {
      contentView: {
        order: '1',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        marginLeft: '210px',
        paddingTop: '50px'
      },
      createPost: {
        width: '40%'
      }
    };

    return (
      <div style={styles.contentView}>
        <input
          type={ this.state.type }
          className="create-post-input"
          onFocus={ this.showModal }
          placeholder="What's on your mind ?"
        />
        <Modal show={this.state.showModal} handleClose={this.hideModal}>
          <CreatePost
            categories={this.props.categories}
            afterSubmit={this.hideModal} />
        </Modal>
        <div style={styles.postList}>
          {this.props.posts.map(post => post.title && (
              <Post {...post} key={post.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default MiddlePane;
