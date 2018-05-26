import React, { Component } from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
import CreatePost from './CreatePost';
import { connect } from 'react-redux';

class FeedView extends Component {
  // TODO: Move all these states to Redux store
  state = {
    posts: undefined,
    categories: undefined,
  }

  componentDidMount() {
    /*
      TODO:
      1. Introduce concept of cursor and postLength
      2. Don't fetch all posts at once, only fetch a certain number based on postLength
      3. Keep the track of number of posts rendered in client using cursor.
      4. Send the cursor to API server so that it can send new posts.
      5. Post length should be dynamic based on user scrolling behavior.
      6. If user is scrolling too fast fetch more number of posts so that he might not notice loading spinner.
      7. If user is scrolling very less fetch less number of posts to improve network calls and memory.
      8. Introduce the concept of throttle-debounce in order to optimize network calls even more and to make application smoother.
    */

    // Posts GET Call
    fetch('http://localhost:3001/posts', {
      headers: {
        'Authorization': 'Basic '+btoa('shashi:123')
      }
    }).then(res => res.json()).then(res => {
      // TODO: Dispatch actions to update the store with this data.
      this.setState({ posts: res });
    });

    // Categories GET Call
    fetch('http://localhost:3001/categories', {
      headers: {
        'Authorization': 'Basic '+btoa('shashi:123')
      }
    }).then(res => res.json()).then(res => {
      // TODO: Dispatch actions to update the store with this data.
      this.setState({ categories: res.categories });
    });

    /*
      TODO: Add implementation of refreshing this page when user creates new post.
    */
  }

  render() {
    if (this.state.posts === undefined || this.state.categories === undefined) {
      return null;
    }

    return (
      <div className='root'>
        <div className="header">
        </div>
        <div className="body">
          <CreatePost categories={this.state.categories}/>
          <div className="posts">
            {this.state.posts.map(post => post.title && (
              <Link
                  to={{
                    pathname: '/post',
                    state: { post: post }
                  }}
                  style={{ textDecoration: 'none' }}
                  key={post.id}
              >
                <Post {...post} key={post.id} />
              </Link>
            ))}
          </div>

          <div className="right-nav">
            <h4 className="right-nav-header"> Categories </h4>
            <div className="categories">
              {this.state.categories.map(category => (
                <Link
                    to={{
                      pathname: '/category',
                      state: { category: category.path }
                    }}
                    style={{ textDecoration: 'none' }}
                    key={category.name}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, comments }) => {
  // Converting posts object to array
  const postsArray = Object.keys(posts).map(k => posts[k]);
  return ({
    posts: postsArray
  });
}



export default connect(mapStateToProps)(FeedView);
