import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Utils from '../../utils';

/**
 *  Class for displaying the Right pane.
 *  Contains the categories list, which can will
 *  display posts relevant to that category.
 */
class RightPane extends Component {
  render() {
    const styles = {
      rightPane : {
        order: '2',
        width: '210px',
        paddingTop: '50px',
        position: 'fixed',
        top: this.props.top,
        marginLeft: '1070px',
        height: '100%',
        border: '1px solid #c8cbd0',
        borderWidth: 'thin',
      },
    }

    if (Object.keys(this.props.categories).length === 0 && this.props.categories.constructor === Object) {
      return null;
    }

    return (
      <div style={styles.rightPane}>
        <h4 className="right-nav-header"> Categories </h4>
        <div className="categories">
          {this.props.categories.map(category => (
            <Link
                to={{
                  pathname: `/${category.path}`,
                  state: { category: category.path }
                }}
                style={{ textDecoration: 'none' }}
                key={category.name}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

RightPane.propTypes = {
  top: PropTypes.string,
};

RightPane.defaultProps = {
  top: '42px'
};

const mapStateToProps = ({ categories }) => {
  const categoriesArray = Utils.convertObjectToArray(categories);
  return {
    categories: categoriesArray
  }
}

export default connect(mapStateToProps)(RightPane);
