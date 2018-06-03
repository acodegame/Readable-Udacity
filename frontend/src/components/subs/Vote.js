import React, { Component } from 'react';
import { FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { votePost, voteComment } from '../../actions';
import * as Constants from '../../constants';

/**
 *  This component contains logic of handling votes.
 *  Calling POST /posts/:id and changing views or colors.
 */
class Vote extends Component {
  constructor(props) {
    super(props);
    this.onPressVote = this.onPressVote.bind(this);
  }

  onPressVote(e) {
    const vote = this.props.votetype === Vote.voteEnum.UP_VOTE ? 1 : -1;
    const data = {id: this.props.id, vote: vote};
    // Dispatch votePost action if the voteOn prop is of type VOTE
    if (this.props.voteOn === Constants.ACTION_GENERATORS.POST) {
      this.props.votePost(data);
      this.callVoteAPI('posts')
    }
    // Dispatch votePost action if the voteOn prop is of type COMMENT
    if (this.props.voteOn === Constants.ACTION_GENERATORS.COMMENT) {
      this.props.voteComment(data);
      this.callVoteAPI('comments')
    }
  }

  callVoteAPI(source) {
    fetch(`http://localhost:3001/${source}/${this.props.id}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+ btoa('shashi:123')
      },
      body: JSON.stringify({option: Vote.voteEnum.properties[this.props.votetype].type})
    }).then(res=>res.json())
      .then(res => console.log("Post call response ", res));
  }

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

    const vote = (
      <button onClick={this.onPressVote} style={styles.button}>
        {this.props.votetype === Vote.voteEnum.UP_VOTE
          ? <FaThumbsOUp size={this.props.size} style={styles.icon} />
          : <FaThumbsODown size={this.props.size} style={styles.icon} />}
        {Vote.voteEnum.properties[this.props.votetype].label}
      </button>
    );

    return vote;
  }
}

// Enum of Vote type
Vote.voteEnum = {
  UP_VOTE: 1,
  DOWN_VOTE: 2,
  properties: {
    1: {type: 'upVote', label: 'Upvote'},
    2: {type: 'downVote', label: 'Downvote'}
  }
}

Vote.propTypes = {
  votetype: PropTypes.number.isRequired,
  voteOn: PropTypes.oneOf(Object.keys(Constants.ACTION_GENERATORS)),
  id: PropTypes.string.isRequired,
  size: PropTypes.number
};

Vote.defaultProps = {
  size: 15
}

const mapStateToProps = ({ posts, comments }) => {
  //console.log("Vote:mapStateToProps posts ", posts, ", comments ", comments);
  // Check whether vote has to be made for post or for comment
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    votePost: (data) => dispatch(votePost(data)),
    voteComment: (data) => dispatch(voteComment(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
