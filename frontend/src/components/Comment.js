import React from 'react';
import * as Utils from '../utils';

const Comment = props => {
  return (
    <div className='comment'>
      <b>
        {props.author}
      </b>  ·
      <div className='commentBody'>
        {props.body}
      </div>
      <div className='commentVotes'>
        {props.voteScore} votes
      </div>
      <div className='commentTimestamp'>
        {Utils.showDateTime(props.timestamp)}
      </div>
    </div>
  );
}
export default Comment;
