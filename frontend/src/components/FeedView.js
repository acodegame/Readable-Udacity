import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initializePosts, initializeCategories } from '../actions';
import LeftPane from './panes/LeftPane';
import MiddlePane from './panes/MiddlePane';
import RightPane from './panes/RightPane';

import Header from './subs/Header';
import Spinner from './subs/Spinner';

const pagination = 10;

const styleLayout = {
  siteWrapper: {
    display: 'flex',
    flexDirection: "column",
    minHeight: '100vh'
  },
  site: {
    display: 'flex',
    flexGrow: '1',
    background: '#e9ebee'
  },
}

class FeedView extends Component {

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

    /*
      TODO: Check first in the store cache if it doesn't have enough posts
      then make a call.
    */
    // Posts GET Call
    fetch('http://localhost:3001/posts', {
      headers: {
        'Authorization': 'Basic '+btoa('shashi:123')
      }
    }).then(res => res.json()).then(res => {
      this.props.initializePosts(res);
    });

    /*
      TODO: Check first in the store cache if it doesn't have enough categories
      then make a call.
    */
    // Categories GET Call
    fetch('http://localhost:3001/categories', {
      headers: {
        'Authorization': 'Basic '+ btoa('shashi:123')
      }
    }).then(res => res.json()).then(res => {
      this.props.initializeCategories(res.categories);
    });
  }

  showLoader() {
    this.setState({
      isLoading: true
    });
  }

  hideLoader() {
    this.setState({
      isLoading: false
    });
  }

  render() {
    if (this.props.posts === undefined || this.props.categories === undefined) {
      return null;
    }

    return (
      <div style={styleLayout.siteWrapper}>
        {
          /*
            Make sure to send "top" prop in Left and Right pane same as whenever
            height prop is send to Header. This is to ensure that the navs will
            stick to header while scrolling.
          */
        }
        <Header headerText="Readable"/>

        <div style={styleLayout.site}>
          <LeftPane />
          <MiddlePane posts={this.props.posts} categories={this.props.categories}/>
          <RightPane />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, comments, categories }) => {
  //console.log("FeedView: posts", posts, ", comments ", comments, ",categories ", categories);
  // Converting posts object to array
  const postsArray = Object.keys(posts).map(k => posts[k]);
  const categoriesArray = Object.keys(categories).map(k => categories[k]);
  return ({
    posts: postsArray,
    categories: categoriesArray,
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializePosts: (data) => dispatch(initializePosts(data)),
    initializeCategories: (data) => dispatch(initializeCategories(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
