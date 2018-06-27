import React, { Component } from 'react';
import Post from './Post';
import { categoryData, initializePosts, initializeCategories } from '../actions';
import { connect } from 'react-redux';
import * as Utils from '../utils';
import Header from './subs/Header';
import LeftPane from './panes/LeftPane';
import RightPane from './panes/RightPane';

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
  contentView: {
    order: '1',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    paddingTop: '50px'
  },
  noResults: {
    marginLeft: '220px',
    paddingTop: '50px'
  },
}

class CategoryView extends Component {

  /*
    TODO: This CategoryView should be deleted or make it a Functional Stateless component
    FeedView later will have four blocks, kindly look into the block details in FeedView component.
  */

  componentDidUpdate(prevProps) {
    const category = this.props.location.pathname.substr(1);  // removing the path seperator '/'
    // Posts of certain category GET Call
    if (this.props.location.pathname !== prevProps.location.pathname) {
      fetch(`http://localhost:3001/${category}/posts`, {
        headers: {
          'Authorization': 'Basic '+btoa('shashi:123')
        }
      }).then(res => res.json()).then(res => {
        this.props.categoryData(category, res);
      });
    }
  }

  componentDidMount() {
    const category = this.props.location.pathname.substr(1);  // removing the path seperator '/'

    if (this.props.posts && this.props.posts.length === 0) {
      // Posts GET Call
      fetch('http://localhost:3001/posts', {
        headers: {
          'Authorization': 'Basic '+ btoa('shashi:123')
        }
      }).then(res => res.json()).then(res => {
        this.props.initializePosts(res);
      });
    }

    if (this.props.categories && Object.keys(this.props.categories).length === 0 && this.props.categories.constructor === Object) {
      // Categories GET Call
      fetch('http://localhost:3001/categories', {
        headers: {
          'Authorization': 'Basic '+ btoa('shashi:123')
        }
      }).then(res => res.json()).then(res => {
        this.props.initializeCategories(res.categories);
      });
    }

    // Posts of certain category GET Call
    fetch(`http://localhost:3001/${category}/posts`, {
      headers: {
        'Authorization': 'Basic '+btoa('shashi:123')
      }
    }).then(res => res.json()).then(res => {
      this.props.categoryData(category, res);
    });
  }

  render() {
    if (this.props.posts === undefined) {
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
          <div style={styleLayout.contentView}>
            {
              this.props.posts.length === 0
              ? <div style={styleLayout.noResults}> No Posts found for {this.props.location.pathname.substr(1)} </div>
              : this.props.posts.map(post => <Post {...post} key={post.id}/>)}
          </div>
          <RightPane categories={this.props.categories}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories }, props) => {
  const category = props.location.pathname.substr(1);
  // Since there can be only one category where user navigated to.
  const postArray = Utils.convertObjectToArray(posts);
  const categoryArray = Utils.convertObjectToArray(categories).filter(c => c.name === category)[0]
  return {
    ...props,
    categories,
    posts: postArray.filter(p => categoryArray && categoryArray.posts && categoryArray.posts.indexOf(p.id)!== -1)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializeCategories: (data) => dispatch(initializeCategories(data)),
    initializePosts: (data) => dispatch(initializePosts(data)),
    categoryData: (cat, res) => dispatch(categoryData(cat, res)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);
