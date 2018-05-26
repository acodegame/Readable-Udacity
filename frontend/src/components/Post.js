import React, { Component }  from 'react';
import * as Utils from '../utils';

class Post extends Component {
  // TODO: Move all these states to Redux store
  state = {
    deleted: this.props.deleted,
    voteScore: this.props.voteScore,
    commentCount: this.props.commentCount
  }

  render() {
    if (this.state.deleted === true) {
      return null;
    }
    return (
      <div className='post'>
        <div className='post-header'>
          <b>
            {this.props.author}
          </b>  ·
          <div className='post-title'>
            {this.props.title}
          </div>
          <div className='post-timestamp'>
            {Utils.showDateTime(this.props.timestamp)}
          </div>
        </div>

        <div className='post-body'>
          {this.props.body}
        </div>

        <div className="post-footer">
          <div className='post-comment-count'>
            {this.props.commentCount} comments
          </div>
          <div className='post-votes-count'>
            {this.props.voteScore} votes
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
