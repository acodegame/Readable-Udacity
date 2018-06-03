import React, { Component } from 'react';
import { FaShareSquareO } from 'react-icons/lib/fa';
import PropTypes from 'prop-types';

/**
 *  This component can have seperate logic to show share options.
 */
class Share extends Component {
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
      <button style={styles.button}>
        <FaShareSquareO {...this.props} style={styles.icon} />
        Share
      </button>
    );
  }
}

Share.propTypes = {
  size: PropTypes.number
};

Share.defaultProps = {
  size: 15
}

export default Share;
