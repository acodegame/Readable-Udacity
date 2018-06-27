import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const styles = {
      styleHeader: {
        background: '#4267b2',
        height: this.props.height,
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        width: '100%',
        top: '0px'
      },
      styleText: {
        marginLeft: '10px',
        fontSize: '22px',
        color: '#eeffff',
        fontFamily: 'Verdana, Geneva, sans-serif',
        fontWeight: 'normal'
      },
    }

    return (
      <div style={styles.styleHeader}>
        <Link
            to={{pathname: '/'}}
            style={{ textDecoration: 'none' }}>
          <h2 style={styles.styleText}>{this.props.headerText}</h2>
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  height: PropTypes.string,
  headerText: PropTypes.string.isRequired
};

Header.defaultProps = {
  height: '42px'
};

export default Header;
