import React, { Component } from 'react';
import { MdEdit } from 'react-icons/lib/md';
import PropTypes from 'prop-types';
import Modal from './Modal';
import CreatePost from '../CreatePost';
import CreateComment from '../CreateComment';
import * as Constants from '../../constants';

class Edit extends Component {
  state = {
    show: false
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
          <MdEdit size={this.props.size} />
        </button>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          {
            this.props.editType === Constants.ACTION_GENERATORS.POST
              ? <CreatePost
                  categories={this.props.categories}
                  afterSubmit={this.hideModal}
                  mode={Constants.ACTION_MODE.EDIT}
                  data={this.props.data} />
              : <CreateComment
                  afterSubmit={this.hideModal}
                  id={this.props.id}
                  mode={Constants.ACTION_MODE.EDIT}
                  data={this.props.data} />
          }
        </Modal>
      </div>
    );
  }
}

Edit.propTypes = {
  size: PropTypes.number,
  editType: PropTypes.oneOf(Object.keys(Constants.ACTION_GENERATORS)).isRequired,
  data: PropTypes.object.isRequired    // this field will contain either comment or posts data.
};

Edit.defaultProps = {
  size: '15'
}

export default Edit;
