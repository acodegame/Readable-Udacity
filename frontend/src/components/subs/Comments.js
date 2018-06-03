import React, { Component } from 'react';
import { FaCommentsO } from 'react-icons/lib/fa';
import PropTypes from 'prop-types';

/**
 *  This component can have seperate logic to change from
 *  FaCommentsO to FaComments when user has commented on it.
 */
class Comments extends Component {
  render() {
    const styles = {
      icon: {
        marginRight: '5px',
        marginTop: '-2px',
      },
      button: {
        borderRadius: '2px',
        border: 'none',
        padding: '3px 3px',
        width: '100px',
        textDecoration: 'none',
        display: 'inline-block',
        cursor: 'pointer',
      }
    }

    return (
      <button onClick={this.props.onClick} style={styles.button}>
        <FaCommentsO {...this.props} style={styles.icon}/>
        Comments
      </button>
    );
  }
}

Comments.propTypes = {
  size: PropTypes.number
};

Comments.defaultProps = {
  size: 15
}

export default Comments;
