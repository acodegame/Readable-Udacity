import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 *  Class for displaying the Left pane.
 *  Contains the filtering and sort options of posts.
 */
class LeftPane extends Component {
  render() {
    const styles = {
      leftPane : {
            order: '-1',
            width: '200px',
            paddingTop: '70px',
            paddingLeft: '10px',
            background: '#e9ebee',
            position: 'fixed',
            top: this.props.top,
            height: '100%',
            border: '1px solid #c8cbd0',
            borderWidth: 'thin',
      },
    }

    return (
      <div style={styles.leftPane}>
        Displays filters and sort options
      </div>
    );
  }
}

LeftPane.propTypes = {
  top: PropTypes.string,
};

LeftPane.defaultProps = {
  top: '42px'
};

export default LeftPane;
