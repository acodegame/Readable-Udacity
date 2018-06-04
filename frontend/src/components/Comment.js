import React, {Component} from 'react';
import * as Utils from '../utils';
import DotSeperator from './subs/DotSeperator';
import LineSeperator from './subs/LineSeperator';
import Edit from './subs/Edit';
import Delete from './subs/Delete';
import Vote from './subs/Vote';
import * as Constants from '../constants';
import { connect } from 'react-redux';

class Comment extends Component {
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
    };
    if (this.props.deleted === true) {
      return null;
    }
    return (
      <div style={styles.post}>
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
            <Edit size={15} editType={Constants.ACTION_GENERATORS.COMMENT} data={this.props} />
            <Delete
              deleteType={Constants.ACTION_GENERATORS.COMMENT}
              id={this.props.id}
              size={15}
              parentId={this.props.parentId} />
          </div>
        </div>
        <LineSeperator />

        <div style={styles.postBody}>
          {this.props.body}
        </div>

        <div style={styles.time}>
          {this.props.voteScore} votes
        </div>

        <div style={styles.postInteraction}>
          <Vote
            votetype={Vote.voteEnum.UP_VOTE}
            voteOn={Constants.ACTION_GENERATORS.COMMENT}
            id={this.props.id}/>
          <Vote
            votetype={Vote.voteEnum.DOWN_VOTE}
            voteOn={Constants.ACTION_GENERATORS.COMMENT}
            id={this.props.id}/>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({comments}, props) => {
  const commentsArray = Object.keys(comments).map(k => comments[k]).filter(comment => comment.id === props.id);
  // There can't be more than one post.
  return {
    ...commentsArray[0]
  }
}

export default connect(mapStateToProps)(Comment);
