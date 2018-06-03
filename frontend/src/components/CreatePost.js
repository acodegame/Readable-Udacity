import React, { Component } from 'react';
import * as Utils from '../utils';
import { connect } from 'react-redux';
import { addPost, editPost } from '../actions';
import PropTypes from 'prop-types';
import * as Constants from '../constants';

class CreatePost extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.mode === Constants.ACTION_MODE.CREATE) {
      this.callCreatePostAPI();
    } else if (this.props.mode === Constants.ACTION_MODE.EDIT) {
      this.callEditPostAPI();
    }
    this.props.afterSubmit();
  }

  callCreatePostAPI() {
    //1. generate UUID unique ID.
    const uuid = Utils.guid();

    //2. Generate data Object
    const data = {}
    for (const field in this.refs) {
      data[field] = this.refs[field].value;
    }
    data['id'] = uuid;
    data['timestamp'] = Date.now();

    // POST call to API server.
    fetch('http://localhost:3001/posts', {
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+btoa('shashi:123')
      },
      method: 'POST'
    }).then(res => res.json())
      .then(res => this.props.dispatch(addPost(res)));
  }

  callEditPostAPI() {
    const data = {}
    data['title'] = this.refs['title'].value;
    data['body'] = this.refs['body'].value
    console.log("EditPost data ", data);
    // POST call to API server.
    fetch(`http://localhost:3001/posts/${this.props.data.id}`, {
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+btoa('shashi:123')
      },
      method: 'PUT'
    }).then(res => res.json())
      .then(res => this.props.dispatch(editPost(res)));
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
            Title:
            <input
                type="text"
                ref="title"
                defaultValue={this.props.data && this.props.data.title}
                className="create-post-author"
                placeholder="Your name..."
                required
            />
          </label>
          <label>
            Body:
            <textarea ref="body" defaultValue={this.props.data && this.props.data.body} />
          </label>
          <select ref="category" defaultValue={this.props.data && this.props.data.category} >
            {this.props.categories.map(category => (
              <option value = {category.name} key = {category.name}>{category.name}</option>
            ))}
          </select>
          <input type="submit" value="Submit" />
          <input type="reset" value="Reset" />
        </form>
      </div>
    );

    return(
      <div className="create-post">
        <b> {this.props.mode === Constants.ACTION_MODE.CREATE ? 'Create' : 'Edit'} Post </b>
        {createPostForm}
      </div>
    )
  }
}


CreatePost.propTypes = {
  mode: PropTypes.oneOf(Object.keys(Constants.ACTION_MODE)),
}

CreatePost.defaultProps = {
  mode: Constants.ACTION_MODE.CREATE
}

const mapStateToProps = ({posts, comments, categories}, props) => {
  const categoriesArray = Object.keys(categories).map(k => categories[k]);
  return {
    categories: categoriesArray,
  }
}

export default connect(mapStateToProps)(CreatePost);
