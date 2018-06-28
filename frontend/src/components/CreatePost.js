import React, { Component } from 'react';
import * as Utils from '../utils';
import { connect } from 'react-redux';
import { addPost, editPost } from '../actions';
import PropTypes from 'prop-types';
import * as Constants from '../constants';

const FormRefsConstants = {
  AUTHOR: 'author',
  TITLE: 'title',
  BODY: 'body',
  CATEGORY: 'category'
}
const DEFAULT_CATEGORY = 'select';

class CreatePost extends Component {
  state = {
    errors: undefined,
  }

  /* This will return an object with the key name as refs of form
   * fields and value as the error message
   */
  validate() {
    const errors = {};

    // Form refs variables
    const category = this.refs[FormRefsConstants.CATEGORY].value;

    // Validations
    if (category === DEFAULT_CATEGORY) {
      Object.assign(errors, {category: "Please select a category"})
    }
    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    const errors = this.validate();
    if (!(Object.keys(errors).length === 0 && errors.constructor === Object)) {
      this.setState({ errors: errors });
      return;
    }

    // Submit the form if the validation is successful.
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

          {/* Author field */}
          <label>
            Author:
            { this.props.mode === Constants.ACTION_MODE.EDIT
              ? <label style={{fontSize: '15px', fontWeight: 'bold'}}> {this.props.data.author} </label>
              :
            <input
              type="text"
              ref={FormRefsConstants.AUTHOR}
              className="create-post-author"
              placeholder="Your name..."
              required
            />}
          </label><br/>
          {this.state.errors && this.state.errors[FormRefsConstants.AUTHOR]}

          {/* Title field */}
          <label>
            Title:
            <input
                type="text"
                ref={FormRefsConstants.TITLE}
                defaultValue={this.props.data && this.props.data.title}
                className="create-post-author"
                placeholder="Your name..."
                required
            />
          </label><br/>
          {this.state.errors && this.state.errors[FormRefsConstants.TITLE]}

          {/* Body field */}
          <label>
            Body:
            <textarea ref={FormRefsConstants.BODY} defaultValue={this.props.data && this.props.data.body} />
          </label><br/>
          {this.state.errors && this.state.errors[FormRefsConstants.BODY]}

          {/* Category field */}
          <select ref={FormRefsConstants.CATEGORY} defaultValue={this.props.data ? this.props.data.category : DEFAULT_CATEGORY} >
            <option value={DEFAULT_CATEGORY} disabled hidden>Select category--</option>
            {this.props.categories.map(category => (
              <option value = {category.name} key = {category.name}>{category.name}</option>
            ))}
          </select><br/>
          {this.state.errors && this.state.errors[FormRefsConstants.CATEGORY]}

          {/* Action buttons */}
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
