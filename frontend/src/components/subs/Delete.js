import React, { Component } from 'react';
import { MdDeleteForever } from 'react-icons/lib/md';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { deletePost, deleteComment } from '../../actions';
import * as Constants from '../../constants';
import { connect } from 'react-redux';

/**
 *  This class is responsible to delete the posts or comments
 */
class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * This will make call to api server.
   * DELETE /posts/:id
   */
  handleDelete = (e) => {
    // Call api-Server
    if (this.props.deleteType === Constants.ACTION_GENERATORS.POST) {
      this.props.deletePost(this.props.id);
      this.callDeleteAPI('posts');
    }
    if (this.props.deleteType === Constants.ACTION_GENERATORS.COMMENT) {
      this.props.deleteComment(this.props.id);
      this.callDeleteAPI('comments');
    }
    // Dispatch an action to update store
    this.hideModal();
  }

  callDeleteAPI(source) {
    fetch(`http://localhost:3001/${source}/${this.props.id}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+ btoa('shashi:123')
      }
    }).then(res=>res.json())
      .then(res => console.log("DELETE call response ", res));
  }

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  render() {
    const styles = {
      editBlock: {
        display: 'inline-block'
      },
      button: {
        borderRadius: '2px',
        border: 'none',
        textDecoration: 'none',
        display: 'inline-block',
        cursor: 'pointer',
      }
    }

    return (
      <div style={styles.editBlock}>
        <button onClick={this.showModal} style={styles.button}>
          <MdDeleteForever size={this.props.size} style={styles.icon}/>
        </button>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p> Are you sure you want to delete this post </p>
          <button onClick={this.handleDelete} styles={styles.button}>
            <p> Yes </p>
          </button>
        </Modal>
      </div>
    );
  }
}

Delete.propTypes = {
  size: PropTypes.number,
  id: PropTypes.string,
  deleteType: PropTypes.oneOf(Object.keys(Constants.ACTION_GENERATORS))
};

Delete.defaultProps = {
  size: '15'
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletePost: (data) => dispatch(deletePost(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
  }
}

export default connect(null, mapDispatchToProps)(Delete);
