import React, { Component } from 'react';
import * as Utils from '../utils';

class CreatePost extends Component {
  constructor (props) {
    super(props);
    // TODO: Move all these states to Redux store
    this.state = {
      focus: true,  // TODO: make this false once onFocus implementation is done
      category: undefined
    }

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onFocus() {
    /*
      TODO: Implement it like when user click on Input field it should expand
      and show other input fields like author, category, title, body, etc.
    */
    // this.setState({
    //   focus: true
    // });
  }

  onBlur() {
    /*
      TODO: Once onFocus is implemented find out a way to persis the focus
      so that new text box which came after expanding should be filled.
      To experience uncomment below lines of code.
    */
    // this.setState({
    //   focus: false
    // });
  }

  handleSubmit(e) {
    e.preventDefault();

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
        'Authorization': 'Basic '+btoa('shashi:123')
      },
      method: 'POST'
    })
    .then(response => {
      // TODO: Dispatch actions to update the store with this data.
      console.log(response.json());
    });
  }

  render () {
    const createPostForm = this.state.focus === true ? (
      <div className="create-post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Author:
            <input
                type="text"
                ref="author"
                className="create-post-author"
                placeholder="Your name..."
                required
            />
          </label>
          <label>
            Title:
            <input
                type="text"
                ref="title"
                className="create-post-author"
                placeholder="Your name..."
                required
            />
          </label>
          <label>
            Body:
            <textarea ref="body" value={this.state.value} onChange={this.handleChange} />
          </label>
          <select ref="category">
            {this.props.categories.map(category => (
              <option value = {category.name} key = {category.name}>{category.name}</option>
            ))}
          </select>
          <input type="submit" value="Submit" />
          <input type="reset" value="Reset" />
        </form>
      </div>
    ) : null;

    return(
      <div className="create-post">
        <b> Create Post </b>
        <input
          type={ this.state.type }
          className="create-post-input"
          onFocus={ this.onFocus }
          onBlur={ this.onBlur }
          placeholder="What's on your mind ?"
        />
        {createPostForm}
      </div>
    )
  }
}

export default CreatePost;
