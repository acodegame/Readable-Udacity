import React, { Component } from 'react';
import * as Utils from '../utils';
import { addComment, editComment } from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Constants from '../constants';

class CreateComment extends Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.mode === Constants.ACTION_MODE.CREATE) {
      this.callCreateCommentAPI();
    } else if (this.props.mode === Constants.ACTION_MODE.EDIT) {
      this.callEditCommentAPI();
    }
    this.props.afterSubmit();
  }

  callCreateCommentAPI() {
    //1. generate UUID unique ID.
    const uuid = Utils.guid();

    //2. Generate data Object
    const data = {}
    for (const field in this.refs) {
      data[field] = this.refs[field].value;
    }
    data['id'] = uuid;
    data['timestamp'] = Date.now();
    data['parentId'] = this.props.parentId;
    // POST call to API server.
    fetch('http://localhost:3001/comments', {
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+btoa('shashi:123')
      },
      method: 'POST'
    }).then(res => res.json())
      .then(res => this.props.dispatch(addComment(res)));
  }

  callEditCommentAPI() {
    const data = {}
    data['timestamp'] = Date.now();
    data['body'] = this.refs['body'].value
    console.log("EditComment data ", data);
    fetch(`http://localhost:3001/comments/${this.props.data.id}`, {
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+btoa('shashi:123')
      },
      method: 'PUT'
    }).then(res => res.json())
      .then(res => this.props.dispatch(editComment(res)));
  }

  render () {
    const createPostForm = (
      <div className="create-post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Author:
            { this.props.mode === Constants.ACTION_MODE.EDIT
              ? <label style={{fontSize: '15px', fontWeight: 'bold'}}> {this.props.data.author} </label>
              :
            <input
              type="text"
              ref="author"
              className="create-post-author"
              placeholder="Your name..."
              required
            />}
          </label>
          <label>
            Body:
            <textarea
              ref="body"
              defaultValue={this.props.mode === Constants.ACTION_MODE.EDIT ? this.props.data.body : ""}
              required/>
          </label>
          <input type="submit" value="Submit" />
          <input type="reset" value="Reset" />
        </form>
      </div>
    );

    return(
      <div className="create-post">
        <b> {this.props.mode === Constants.ACTION_MODE.CREATE ? 'Create' : 'Edit'} Comment </b>
        {createPostForm}
      </div>
    )
  }
}

CreateComment.propTypes = {
  mode: PropTypes.oneOf(Object.keys(Constants.ACTION_MODE)).isRequired,
  data: PropTypes.object // in case of Edit we already have the data.
}

CreateComment.defaultProps = {
  mode: Constants.ACTION_MODE.CREATE
}

export default connect()(CreateComment);
