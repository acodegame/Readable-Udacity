import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sort } from '../../actions';
import * as ActionTypes from '../../actions/types';
import * as Constants from '../../constants';
import { connect } from 'react-redux';

/**
 *  Class for displaying the Left pane.
 *  Contains the filtering and sort options of posts.
 */
class LeftPane extends Component {
  state = {
      sortByTimeAsc: false,
      sortByVoteScoreAsc: false,
  }

  sortByTime = (e) => {
    // Doing the opposite because state is being changed later.
    const sortType = this.state.sortByTimeAsc === false
                      ? ActionTypes.SORT_ASC
                      : ActionTypes.SORT_DESC
    this.props.dispatch(sort(sortType, Constants.SORT_BY.TIMESTAMP));
    this.setState({ sortByTimeAsc: !this.state.sortByTimeAsc });
  }

sortByVoteScore = (e) => {
    // Doing the opposite because state is being changed later.
    const sortType = this.state.sortByVoteScoreAsc === false
                      ? ActionTypes.SORT_ASC
                      : ActionTypes.SORT_DESC
    this.props.dispatch(sort(sortType, Constants.SORT_BY.VOTE_SCORE));
    this.setState({ sortByVoteScoreAsc: !this.state.sortByVoteScoreAsc });
  }

  render() {
    const styles = {
      leftPane : {
            order: '-1',
            width: '200px',
            paddingTop: '50px',
            paddingLeft: '10px',
            background: '#e9ebee',
            position: 'fixed',
            top: this.props.top,
            height: '100%',
            border: '1px solid #c8cbd0',
            borderWidth: 'thin',
      },
      sortOptions: {
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      },
      sortPills: {
        lineHeight: '1.5'
      }
    }

    return (
      <div style={styles.leftPane}>
        <h4> Sort by </h4>
        <div style={styles.sortOptions}>
          <a onClick={this.sortByTime} style={styles.sortPills}>Time</a>
          <a onClick={this.sortByVoteScore} style={styles.sortPills}>Votes</a>
        </div>
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

export default connect()(LeftPane);
