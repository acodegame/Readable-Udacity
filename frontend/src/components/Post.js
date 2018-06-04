import React, { Component }  from 'react';
import * as Utils from '../utils';
import DotSeperator from './subs/DotSeperator';
import LineSeperator from './subs/LineSeperator';
import { Link } from 'react-router-dom';
import Vote from './subs/Vote';
import Comments from './subs/Comments';
import Share from './subs/Share';
import Edit from './subs/Edit';
import Delete from './subs/Delete';
import * as Constants from '../constants';

class Post extends Component {
  render() {
    const styles = {
      post: {
        margin: '10px',
        background: '#fff',
        padding: '15px',
        border: '1px solid #c8cbd0',
        borderWidth: 'thin',
        borderRadius: '3px',
        width: '800px',
        alignSelf: 'center'
      },
      postTitle: {
        color: '#262626',
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '1.6',
      },
      postBody: {
        color: '#333',
        overflow: 'hidden',
        fontSize: '15px',
        lineHeight: '1.8',
        marginBottom: '6px'
      },
      postStats: {
        display: 'flex',
        flexDirection: 'row',
      },
      postInteraction: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: '14px',
        paddingTop: '3px',
        marginBottom: '-3px'
      },
      postMetaData: {
        display: 'flex'
      },
      postActions: {
        marginLeft: 'auto'
      },
      authorAndTime: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5px',
      },
      time: {
        color: '#616770',
        fontSize: '13px',
      }
    }
    if (this.props.deleted === true) {
      return null;
    }
    return (
      <div style={styles.post}>

        <div className='post-header'>
          <div style={styles.postMetaData}>
            <div style={styles.authorAndTime}>
              <b style={styles.author}>
                {this.props.author}
              </b>
              <DotSeperator />
              <div style={styles.time}>
                {Utils.convertTime(this.props.timestamp)}
              </div>
            </div>

            <div style={styles.postActions}>
              <Edit size={18} editType={Constants.ACTION_GENERATORS.POST} data={this.props} />
              <Delete id={this.props.id} deleteType={Constants.ACTION_GENERATORS.POST} size={18} />
            </div>
          </div>
          <LineSeperator />
          <Link
              to={{
                // handle this link to be only applicable when the view is in
                // FeedView not in PostView.
                pathname: '/post',
                state: { post: this.props }
              }}
              style={{ textDecoration: 'none' }}
              key={this.props.id}
          >
            <div style={styles.postTitle}>
              {this.props.title}
            </div>
          </Link>
        </div>

        <div style={styles.postBody}>
          {this.props.body}
        </div>

        <div style={styles.postStats}>
          <div style={styles.time}>
            {this.props.commentCount} comments
          </div>
          <DotSeperator />
          <div style={styles.time}>
            {this.props.voteScore} votes
          </div>
        </div>
        <LineSeperator />

        <div style={styles.postInteraction}>
          <Vote
            size={18}
            votetype={Vote.voteEnum.UP_VOTE}
            voteOn={Constants.ACTION_GENERATORS.POST}
            id={this.props.id}/>
          <Vote
            size={18}
            votetype={Vote.voteEnum.DOWN_VOTE}
            voteOn={Constants.ACTION_GENERATORS.POST}
            id={this.props.id}/>
          <Comments size={18} onClick={this.props.onCommentClick} />
          <Share size={18} />
        </div>
      </div>
    );
  }
}

export default Post;
